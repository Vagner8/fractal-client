import { Component, computed, inject, input, Signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { APP_EVENTS, MODIFIERS, APP_FRACTALS } from '@constants';
import { MatListModule, MatSidenavModule } from '@mat';
import { EventService, FractalService, StatesService, ModifiersService } from '@services';
import { Fractal } from '@types';

const { NEW, EDIT, SAVE, DELETE } = MODIFIERS;

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  $taps = input<Fractal | null>(null);

  es = inject(EventService);
  ss = inject(StatesService);
  fs = inject(FractalService);
  ms = inject(ModifiersService);

  AppEvents = APP_EVENTS;
  AppFractals = APP_FRACTALS;

  disabled(cursor: string): { signal: Signal<boolean> } {
    const signal = computed(() => Boolean(cursor));
    return { signal };
  }

  onPageTouched(page: Fractal): void {
    this.ss.selectedFractal.set(page);
    this.fs.navigatePage(page.getString('Cursor'));
  }

  onModifierHeld = (cursor: string): void => {
    switch (cursor) {
      case SAVE:
        this.ms.save();
        break;
      case DELETE:
        // this.ms.delete(current);
        break;
    }
  };

  onModifierTouched(cursor: string): void {
    switch (cursor) {
      case NEW:
        this.ms.newTouched();
        break;
      case EDIT:
        this.ms.edit();
        break;
    }
  }
}
