import { Component, computed, inject, Input, Signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { CAppEvents, CModifiers, CAppFractals } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { EventService, FractalService, StatesService, UpdateService } from '@services';
import { IFractal } from '@types';

const { New, Edit, Save, Delete } = CModifiers;

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Input() modifiers!: IFractal;
  @Input() collections!: IFractal;
  es = inject(EventService);
  ss = inject(StatesService);
  fs = inject(FractalService);
  private readonly us = inject(UpdateService);

  AppEvents = CAppEvents;
  AppFractals = CAppFractals;

  disabled(tapCursor: string): { signal: Signal<boolean> } {
    const signal = computed(() => {
      if (this.ss.$editPageActivated()) {
        switch (tapCursor) {
          case CModifiers.Edit:
            return this.ss.selectedForm.isEmpty;
          case CModifiers.Delete:
            return this.ss.selectedForm.isEmpty;
          default:
            return false;
        }
      } else {
        switch (tapCursor) {
          case CModifiers.Edit:
            return this.ss.selectedChildren.isEmpty;
          case CModifiers.Delete:
            return this.ss.selectedChildren.isEmpty;
          default:
            return false;
        }
      }
    });
    return { signal };
  }

  onPageTouched(page: IFractal): void {
    this.ss.currentFractal.set(page);
    this.ss.markSelectedFractalsPristine();
    this.fs.navigatePage(page.cursor);
  }

  onModifierHeld = (modifier: IFractal): void => {
    switch (modifier.cursor) {
      case Save:
        this.us.save();
        break;
      case Delete:
        // this.us.delete(current);
        break;
    }

    this.ss.currentFractal.refresh();
  };

  onModifierTouched(modifier: IFractal): void {
    const selectedForm = this.ss.selectedForm.value;

    switch (modifier.cursor) {
      case New:
        this.us.new();
        if (!this.ss.$editPageActivated()) {
          this.fs.navigateModifier(modifier.cursor);
        }
        break;
      case Edit:
        this.us.edit();
        if (!this.ss.$editPageActivated()) {
          this.fs.navigateModifier(modifier.cursor);
        }
        break;
      case Delete:
        if (this.ss.$editPageActivated()) {
          selectedForm && this.ss.selectedChildren.deleteBunch([selectedForm]);
        }
        break;
    }
  }
}
