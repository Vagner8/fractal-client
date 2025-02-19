import { Fractal } from '@types';
import { ObjectState } from './abstract/object-state';

export class SelectedFractalFormState extends ObjectState<Fractal | null> {
  constructor() {
    super(null);
  }
}
