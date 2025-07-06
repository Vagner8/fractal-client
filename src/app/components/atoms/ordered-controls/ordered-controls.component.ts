import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, input, TemplateRef } from '@angular/core';
import { Fractal } from '@types';

@Component({
  selector: 'app-ordered-controls',
  imports: [NgTemplateOutlet],
  templateUrl: './ordered-controls.component.html',
})
export class OrderedControlsComponent {
  @Input({ required: true }) templateRef!: TemplateRef<unknown>;
  $fractal = input<Fractal | null>();
}
