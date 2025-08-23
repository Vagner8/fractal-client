import { Component, input } from '@angular/core';
import { Control } from '@types';

@Component({
  selector: 'app-control',
  imports: [],
  templateUrl: './control-view.html',
  styleUrl: './control-view.scss',
})
export class ControlView {
  $like = input<'text' | 'new' | 'edit'>('text');
  $control = input<Control | null>();
}
