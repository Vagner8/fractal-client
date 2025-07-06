import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, input, TemplateRef } from '@angular/core';
import { Fractal } from '@types';

@Component({
  selector: 'app-ordered-children',
  imports: [NgTemplateOutlet],
  templateUrl: './ordered-children.component.html',
})
export class OrderedChildrenComponent {
  @Input({ required: true }) templateRef!: TemplateRef<unknown>;
  $fractal = input<Fractal | null>();
}
