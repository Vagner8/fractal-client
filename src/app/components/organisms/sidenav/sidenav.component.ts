import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { OrderedChildrenComponent, TapComponent } from '@components/atoms';
import { APP_EVENTS, MODIFIERS } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { StatesService, ModifiersService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, MatSidenavModule, RouterOutlet, MatListModule, TapComponent, OrderedChildrenComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  $sidenavTaps = input<Fractal | null>(null);

  ss = inject(StatesService);
  ms = inject(ModifiersService);

  route = inject(ActivatedRoute);

  AppEvents = APP_EVENTS;

  onTouch(tap: Fractal): void {
    if (tap?.parent?.is('Modifiers')) {
      this.onModifierTouch(tap.cursor);
    } else {
      this.ss.setCollection(tap);
    }
  }

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

  onModifierTouch(cursor: string): void {
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
