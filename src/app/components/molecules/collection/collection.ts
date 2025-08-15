import { Component, input } from '@angular/core';
import { Table } from '@components/atoms';
import { Fractal } from '@types';

@Component({
  selector: 'app-collection',
  imports: [Table],
  templateUrl: './collection.html',
  styleUrl: './collection.scss',
})
export class Collection {
  $fractal = input<Fractal | null>();
}
