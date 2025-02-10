import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { SplitIndicators, AppEntities, AppModifiers } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { ManagerService, ModifiersService, TapsService, SelectService, DataService } from '@services';
import { Fractal } from '@types';
import { FractalFactory } from '@utils';
import { BaseService } from 'app/services/base.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  bs = inject(BaseService);
  ds = inject(DataService);
  ts = inject(TapsService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  appEntities = AppEntities;
  splitIndicators = SplitIndicators;

  modifierHeld(modifier: Fractal): void {
    this.ms.hold(modifier);
    switch (modifier.cursor) {
      case AppModifiers.Delete:
        if (!this.ss.$selected.isEmpty) {
          this.ds.delete(this.ss.$selected.toDto()).subscribe();
        }
        break;
    }
  }

  modifierTouched(modifier: Fractal): void {
    const { $current, $selected, $new } = this.ss;
    ({
      [AppModifiers.New]: (): void => {
        this.ms.set(modifier);
      },
      [AppModifiers.Edit]: (): void => {
        if ($selected.isEmpty && $new.isEmpty && $current.value) {
          this.ss.$selected.set([$current.value]);
          this.ms.set(modifier);
        }
        if ($current.value && $selected.has($current.value)) {
          this.ss.clear('$selected');
        }
        if (!$selected.isEmpty) {
          this.ms.set(modifier);
        }
      },
      [AppModifiers.Delete]: (): void => {
        // if (this.ss.are('$selected')) this.ms.set(modifier);
      },
    })[modifier.cursor]?.();
  }

  async pageTouched(tap: Fractal): Promise<void> {
    this.ss.clear('$selected', '$new');
    this.ss.$current.set(tap);
    await this.bs.navigate({}, [tap.cursor]);
    this.ms.set(null);
  }
}
