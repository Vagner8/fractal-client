import { Component, computed, inject, Signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Tap } from '@atoms';
import { MatListModule, MatSidenavModule } from '@mat';
import { CreationService, DataService, FractalService, StatesService } from '@services';
import { Fractal, Modifiers } from '@types';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, MatSidenavModule, RouterOutlet, MatListModule, Tap],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  ds = inject(DataService);
  ss = inject(StatesService);
  fs = inject(FractalService);
  cs = inject(CreationService);

  onModifierHold(modifier: Fractal): void {
    switch (modifier.cursor as Modifiers) {
      case 'save':
        // this.ds.addFractals(this.cs.$children().map((child) => new FractalDtoFactory(child))).subscribe();
        console.log('🚀 ~ save ', this.cs.$children());
        break;
      case 'delete':
        break;
    }
  }

  onModifierTouch(modifier: Fractal): void {
    switch (modifier.cursor as Modifiers) {
      case 'new':
        if (this.fs.$selectedFractalField() === 'children') {
          this.cs.pushChild(this.fs.selectedFractal.value);
        }
        break;
      case 'edit':
        break;
    }
  }

  onModifierDisabled = ({ cursor }: Fractal): Signal<boolean> => {
    const test: Record<Modifiers, Signal<boolean>> = {
      new: computed(() => !this.fs.$selectedFractalField()),
      edit: computed(
        () =>
          this.fs.selectedChildren.$isEmpty() &&
          this.fs.selectedControls.$isEmpty() &&
          this.fs.selectedChildrenControls.$isEmpty(),
      ),
      save: computed(() => false),
      delete: computed(() => false),
    };
    return test[cursor as Modifiers];
  };
}
