import { Injectable, signal } from '@angular/core';
import { Fractal } from '@types';
import { FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  $app = signal<Fractal | null>(null);
  selectedParent = new FractalState();
  selectedChildren = new FractalsState();

  settings!: Fractal;
}
