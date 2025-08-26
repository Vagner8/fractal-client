import { Component, computed, inject, input } from '@angular/core';
import { StatesService } from '@services';
import { Fractal } from '@types';
import { ControlFactory } from '@utils';

@Component({
  selector: 'app-fractal-form',
  imports: [],
  templateUrl: './fractal-form.html',
  styleUrl: './fractal-form.scss',
})
export class FractalForm {
  $fractal = input<Fractal | null>();
  $title = input('');
  ss = inject(StatesService);

  $cursorControl = computed(() => {
    const parent = this.$fractal();
    return parent && new ControlFactory(parent, { cursor: 'cursor', data: parent.cursor });
  });
}
