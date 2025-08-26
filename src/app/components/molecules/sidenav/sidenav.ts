import { Component, computed, inject, Signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Tap } from '@atoms';
import { MatListModule, MatSidenavModule } from '@mat';
import { CreationService, DataService, EventsService, StatesService } from '@services';
import { Fractal, Modifiers } from '@types';
import { FractalDtoFactory } from '@utils';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, MatSidenavModule, RouterOutlet, MatListModule, Tap],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  ds = inject(DataService);
  ss = inject(StatesService);
  es = inject(EventsService);
  cs = inject(CreationService);

  onModifierHold(modifier: Fractal): void {
    switch (modifier.cursor as Modifiers) {
      case 'save':
        this.ds.addFractals(this.cs.$children().map((child) => new FractalDtoFactory(child))).subscribe();
        break;
      case 'delete':
        break;
    }
  }

  onModifierTouch(modifier: Fractal): void {
    const cursor = modifier.cursor as Modifiers;
    this.es.$modifierTouch.set(cursor);
    switch (cursor) {
      case 'new':
        break;
      case 'edit':
        break;
    }
  }

  onModifierDisabled = ({ cursor }: Fractal): Signal<boolean> => {
    const test: Record<Modifiers, Signal<boolean>> = {
      new: computed(() => false),
      edit: computed(() => false),
      save: computed(() => false),
      delete: computed(() => false),
    };
    return test[cursor as Modifiers];
  };
}
