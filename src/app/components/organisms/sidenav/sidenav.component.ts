import { Component, inject, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { ConstAppEvents, ConstNavigableModifiers, ConstModifiers, ConstAppFractals } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { EventService, FractalService, StatesService, UpdateService } from '@services';
import { IFractal } from '@types';
import { ControlFactory, FractalFactory } from '@utils';

const { New, Edit, Save, Delete } = ConstModifiers;

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

  AppEvents = ConstAppEvents;
  AppFractals = ConstAppFractals;

  onPageTouched(page: IFractal): void {
    this.ss.currentFractal.set(page);
    this.ss.markSelectedFractalsPristine();
    this.fs.navigatePage(page.cursor);
  }

  onModifierHeld = (modifier: IFractal): void => {
    const current = this.ss.currentFractal.value;
    if (!current) return;

    switch (modifier.cursor) {
      case Save:
        this.us.save(current);
        break;
      case Delete:
        this.us.delete(current);
        break;
    }

    this.ss.currentFractal.refresh();
  };

  onModifierTouched(modifier: IFractal): void {
    const current = this.ss.currentFractal.value;
    const selectedForm = this.ss.selectedForm.value;

    switch (modifier.cursor) {
      case New:
        if (selectedForm) {
          selectedForm.newControls.push(ControlFactory(selectedForm.dto.id));
        } else {
          current && this.ss.selectedChildren.push(FractalFactory(current));
          this.navigateToEditPage(modifier);
        }
        break;
      case Edit:
        if (!this.ss.$editPageActivated()) {
          this.navigateToEditPage(modifier);
        } else {
          selectedForm?.fullEditMode.toggle();
        }
        break;
      case Delete:
        if (this.ss.$editPageActivated()) {
          selectedForm && this.ss.selectedChildren.deleteBunch([selectedForm]);
        }
        break;
    }
  }

  private navigateToEditPage({ cursor }: IFractal): void {
    if (
      Object.hasOwn(ConstNavigableModifiers, cursor) &&
      (!this.ss.selectedChildren.isEmpty || !this.ss.currentFractal.isEmpty)
    ) {
      this.fs.navigateModifier(ConstNavigableModifiers.Edit);
    }
  }
}
