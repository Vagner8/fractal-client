import { Component, inject, input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { APP_EVENTS, MODIFIERS } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { EventService, FractalService, StatesService, ModifiersService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  $fractal = input<Fractal | null>(null);

  es = inject(EventService);
  ss = inject(StatesService);
  fs = inject(FractalService);
  ms = inject(ModifiersService);

  AppEvents = APP_EVENTS;

  onTouch(tap: Fractal): void {
    if (tap.parent.is('Modifiers')) {
      this.onModifierTouch(tap.cursor);
    } else {
      this.ss.selectedFractal.set(tap);
      this.fs.navigatePage(tap.cursor);
    }
  }

  onHold(tap: Fractal): void {
    if (tap.parent.is('Modifiers')) {
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

  onModifierTouch(cursor: string): void {
    switch (cursor) {
      case MODIFIERS.NEW:
        this.ms.newTouched();
        break;
      case MODIFIERS.EDIT:
        this.ms.edit();
        break;
    }
  }
}
