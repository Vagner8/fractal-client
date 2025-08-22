import { P } from '@angular/cdk/platform.d-B3vREl3q';
import { Component, computed, inject, input } from '@angular/core';
import { Card } from '@atoms';
import { ControlForm } from '@molecules';
import { FractalService } from '@services';
import { Control, Fractal } from '@types';
import { ControlFactory } from '@utils';

@Component({
  selector: 'app-fractal-form',
  imports: [ControlForm, Card],
  templateUrl: './fractal-form.html',
  styleUrl: './fractal-form.scss',
})
export class FractalForm {
  $fractal = input<Fractal | null>();
  $title = input('');
  fs = inject(FractalService);

  $cursorControl = computed(() => {
    const parent = this.$fractal();
    return parent && new ControlFactory(parent, { cursor: 'cursor', data: parent.cursor });
  });
}
