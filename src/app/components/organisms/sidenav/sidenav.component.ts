import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { SplitIndicators } from '@constants';
import { FractalFactory } from 'app/utils/fractal';
import { MatListModule, MatSidenavModule } from '@mat';
import { ManagerService, ModifiersService, TapsService, SelectService, DataService } from '@services';
import { Fractal } from '@types';
import { AppEntities, AppModifiers } from '@utils';
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
        if (!this.ss.$fractals.isEmpty) {
          this.ds.delete(this.ss.$fractals.toDto()).subscribe();
        }
        break;
    }
  }

  modifierTouched(modifier: Fractal): void {
    const { $current, $fractals, $fractalForm, $newFractals } = this.ss;
    ({
      [AppModifiers.New]: (): void => {
        this.ss.$fractalForm.toggle(new FractalFactory({ parent: $current.value }));
        this.ms.set(modifier);
      },
      [AppModifiers.Edit]: (): void => {
        if ($fractalForm.has($current.value)) {
          return;
        }
        if ($fractals.isEmpty && $newFractals.isEmpty && $current.value) {
          this.ss.$fractals.set([$current.value]);
          this.ms.set(modifier);
        }
        if ($current.value && $fractals.has($current.value)) {
          this.ss.clear('$fractals');
          this.ss.$fractalForm.toggle($current.value);
        }
      },
      [AppModifiers.Delete]: (): void => {
        // if (this.ss.are('$fractals')) this.ms.set(modifier);
      },
    })[modifier.cursor]?.();
  }

  async pageTouched(tap: Fractal): Promise<void> {
    this.ss.clear('$fractals', '$newFractals');
    this.ss.$current.set(tap);
    await this.bs.navigate({}, [tap.cursor]);
    this.ms.set(null);
  }
}
