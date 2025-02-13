import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstSplitIndicators, ConstAppEntities, ConstAppModifiers } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { ManagerService, ModifiersService, TapsService, SelectService, DataService, EntitiesService } from '@services';
import { Fractal } from '@types';
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
  es = inject(EntitiesService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  appEntities = ConstAppEntities;
  splitIndicators = ConstSplitIndicators;

  modifierHeld(modifier: Fractal): void {
    this.ms.hold(modifier);
    switch (modifier.cursor) {
      case ConstAppModifiers.Delete:
        if (!this.ss.$selected.isEmpty) {
          this.ds.delete(this.ss.$selected.toDto()).subscribe();
        }
        break;
    }
  }

  modifierTouched(modifier: Fractal): void {
    const { $current, $selected } = this.ss;
    ({
      [ConstAppModifiers.New]: (): void => {
        this.ms.set(modifier);
      },
      [ConstAppModifiers.Edit]: (): void => {
        if (!$selected.isEmpty) {
          this.ms.set(modifier);
        }
        if ($selected.isEmpty && $current.value) {
          this.ss.$selected.set([$current.value]);
          this.ms.set(modifier);
        }
      },
      [ConstAppModifiers.Delete]: (): void => {},
    })[modifier.cursor]?.();
  }

  pageTouched(tap: Fractal): void {
    this.ms.clear();
    this.ss.clear('$selected', '$new');
    this.ss.$current.set(tap);
  }
}
