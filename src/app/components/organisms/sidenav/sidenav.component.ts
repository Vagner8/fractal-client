import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Tap } from '@components/atoms';
import { MODIFIERS } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { FractalService, ModifiersService, StatesService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, MatSidenavModule, RouterOutlet, MatListModule, Tap],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class Sidenav {
  ss = inject(StatesService);
  fs = inject(FractalService);
  ms = inject(ModifiersService);
  route = inject(ActivatedRoute);

  modifiers = this.fs.$app()?.findChildRecursively('Modifiers');

  onHold(tap: Fractal): void {
    if (tap?.parent?.is('Modifiers')) {
      switch (tap.cursor) {
        case MODIFIERS.SAVE:
          this.ms.save();
          break;
        case MODIFIERS.DELETE:
          // this.ms.delete(current);
          break;
      }
    }
  }

  onTouch(tap: Fractal): void {
    this.fs.selectedFractal.set(tap);
  }

  onModifierHold({ cursor }: Fractal): void {
    switch (cursor) {
      case MODIFIERS.NEW:
        this.ms.new();
        break;
      case MODIFIERS.EDIT:
        this.ms.edit();
        break;
    }
  }

  onModifierTouch({ cursor }: Fractal): void {
    switch (cursor) {
      case MODIFIERS.NEW:
        this.ms.new();
        break;
      case MODIFIERS.EDIT:
        this.ms.edit();
        break;
    }
  }
}
