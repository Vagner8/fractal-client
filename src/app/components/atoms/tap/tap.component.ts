import { Component, computed, inject, input, output } from '@angular/core';
import { MODIFIERS } from '@constants';
import { TapDirective } from '@directives';
import { MatButtonModule, MatIconModule } from '@mat';
import { StatesService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-tap',
  imports: [MatIconModule, MatButtonModule, TapDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss',
})
export class TapComponent {
  $fractal = input<Fractal>();

  ss = inject(StatesService);

  $disable = computed<boolean>(() => {
    const cursor = this.$fractal()?.cursor;
    if (this.ss.$editorParam()) {
      switch (cursor) {
        case MODIFIERS.EDIT:
          return true;
        case MODIFIERS.NEW:
          return false;
        default:
          return false;
      }
    } else {
      switch (cursor) {
        case MODIFIERS.EDIT:
          return this.ss.selectedChildren.$isEmpty();
        case MODIFIERS.NEW:
          return false;
        default:
          return false;
      }
    }
  });

  hold = output<Fractal>();
  touch = output<Fractal>();
}
