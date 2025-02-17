import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstSort, ConstEntities, ConstModifiers, ConstEvents } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { SelectService, DataService, EntitiesService } from '@services';
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
  ss = inject(SelectService);
  private ds = inject(DataService);

  events = ConstEvents;
  entities = ConstEntities;
  splitIndicators = ConstSort;

  onModifierHeld({ cursor }: Fractal): void {
    this.ss.modifiers.hold$.next(cursor);
    switch (cursor) {
      case ConstModifiers.Delete:
        if (!this.ss.selectedFractals.isEmpty) {
          this.ds.delete(this.ss.selectedFractals.toDto()).subscribe();
        }
        break;
    }
  }

  onModifierTouched({ cursor }: Fractal): void {
    const { currentFractal, selectedFractals } = this.ss;
    const { New, Edit, Delete } = ConstModifiers.record;
    ({
      [New]: (): void => {
        this.ss.modifiers.setAndNavigate(cursor);
      },
      [Edit]: (): void => {
        if (selectedFractals.isEmpty && currentFractal.isEmpty) return;
        this.ss.modifiers.setAndNavigate(cursor);
      },
      [Delete]: (): void => {},
    })[cursor]?.();
  }

  onPageTouched(tap: Fractal): void {
    this.ss.modifiers.clear();
    this.ss.selectedFractals.clear();
    this.ss.currentFractal.setAndNavigate(tap);
  }
}
