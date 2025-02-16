import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstSort, ConstEntities, ConstModifiers, ConstEvents } from '@constants';
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
  ts = inject(TapsService);
  mas = inject(ManagerService);
  private ds = inject(DataService);
  private ss = inject(SelectService);
  private ms = inject(ModifiersService);

  events = ConstEvents;
  entities = ConstEntities;
  splitIndicators = ConstSort;

  onModifierHeld({ cursor }: Fractal): void {
    this.ms.hold(cursor);
    switch (cursor) {
      case ConstModifiers.Delete:
        if (!this.ss.$selectedFractals.isEmpty) {
          this.ds.delete(this.ss.$selectedFractals.toDto()).subscribe();
        }
        break;
    }
  }

  onModifierTouched({ cursor }: Fractal): void {
    const { $currentFractal, $selectedFractals } = this.ss;
    const { New, Edit, Delete } = ConstModifiers.record;
    ({
      [New]: (): void => {
        this.ms.set(cursor);
      },
      [Edit]: (): void => {
        if (!$selectedFractals.isEmpty) {
          this.ms.set(cursor);
        }
        if ($selectedFractals.isEmpty && $currentFractal.value) {
          this.ss.$selectedFractals.set([$currentFractal.value]);
          this.ms.set(cursor);
        }
      },
      [Delete]: (): void => {},
    })[cursor]?.();
  }

  onPageTouched(tap: Fractal): void {
    this.ms.clear();
    this.ss.setCurrentFractals(tap);
  }
}
