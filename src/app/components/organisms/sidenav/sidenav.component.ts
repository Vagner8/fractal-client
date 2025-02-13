import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstSplitIndicators, ConstEntities, ConstModifiers, ConstEvents } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { ManagerService, ModifiersService, TapsService, SelectService, DataService, EntitiesService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  es = inject(EntitiesService);
  mgr = inject(ManagerService);
  ts = inject(TapsService);
  private ds = inject(DataService);
  private ss = inject(SelectService);
  private ms = inject(ModifiersService);

  events = ConstEvents;
  entities = ConstEntities;
  splitIndicators = ConstSplitIndicators;

  modifierHeld(modifier: Fractal): void {
    this.ms.hold(modifier);
    switch (modifier.cursor) {
      case ConstModifiers.Delete:
        if (!this.ss.$selected.isEmpty) {
          this.ds.delete(this.ss.$selected.toDto()).subscribe();
        }
        break;
    }
  }

  modifierTouched(modifier: Fractal): void {
    const { $current, $selected } = this.ss;
    ({
      [ConstModifiers.New]: (): void => {
        this.ms.set(modifier);
      },
      [ConstModifiers.Edit]: (): void => {
        if (!$selected.isEmpty) {
          this.ms.set(modifier);
        }
        if ($selected.isEmpty && $current.value) {
          this.ss.$selected.set([$current.value]);
          this.ms.set(modifier);
        }
      },
      [ConstModifiers.Delete]: (): void => {},
    })[modifier.cursor]?.();
  }

  pageTouched(tap: Fractal): void {
    this.ms.clear();
    this.ss.clear('$selected', '$new');
    this.ss.$current.set(tap);
  }
}
