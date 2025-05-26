import { Component, computed, inject, Signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { CAppEvents, CModifiers, CAppFractals } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { EventService, FractalService, StatesService, ModifiersService } from '@services';
import { IFractal } from '@types';

const { New, Edit, Save, Delete } = CModifiers;

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  es = inject(EventService);
  ss = inject(StatesService);
  fs = inject(FractalService);
  private readonly ms = inject(ModifiersService);

  AppEvents = CAppEvents;
  AppFractals = CAppFractals;

  disabled(tapCursor: string): { signal: Signal<boolean> } {
    const signal = computed(() => {
      if (this.ss.$onEditPage()) {
        switch (tapCursor) {
          case CModifiers.Save:
            return this.ss.dirtyFractals.$value().length === 0 && this.ss.newFractals.$value().length === 0;
          case CModifiers.Edit:
            return this.ss.selectedFractalForm.isEmpty;
          case CModifiers.Delete:
            return this.ss.selectedFractalForm.isEmpty;
          default:
            return false;
        }
      } else {
        switch (tapCursor) {
          case CModifiers.Save:
            return true;
          case CModifiers.Edit:
            return this.ss.selectedChildrenFractals.isEmpty;
          case CModifiers.Delete:
            return this.ss.selectedChildrenFractals.isEmpty;
          default:
            return false;
        }
      }
    });
    return { signal };
  }

  onPageTouched(page: IFractal): void {
    this.ss.selectedParentFractal.set(page);
    this.ss.clearSelectedFractals();
    this.fs.navigatePage(page.cursor);
  }

  onModifierHeld = (modifier: IFractal): void => {
    switch (modifier.cursor) {
      case Save:
        this.ms.save();
        break;
      case Delete:
        // this.ms.delete(current);
        break;
    }

    this.ss.selectedParentFractal.refresh();
  };

  onModifierTouched(modifier: IFractal): void {
    switch (modifier.cursor) {
      case New:
        this.ms.newTouched();
        break;
      case Edit:
        this.ms.edit();
        break;
    }
  }
}
