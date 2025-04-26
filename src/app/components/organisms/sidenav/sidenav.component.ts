import { Component, inject, Input } from '@angular/core';
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
        // this.us.delete(current);
        break;
    }

    this.ss.currentFractal.refresh();
  };

  onModifierTouched(modifier: IFractal): void {
    const current = this.ss.currentFractal.value;
    if (!current) return;
    const selectedForm = this.ss.selectedForm.value;

    switch (modifier.cursor) {
      case New:
        this.us.new(current, modifier);
        break;
      case Edit:
        this.us.edit(modifier);
        break;
      case Delete:
        if (this.ss.$editPageActivated()) {
          selectedForm && this.ss.selectedChildren.deleteBunch([selectedForm]);
        }
        break;
    }
  }
}
