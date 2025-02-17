import { Fractal } from '@types';
import { ObjectState } from './abstract-states/object-state';

export class CurrentFormState extends ObjectState<Fractal | null> {
  constructor() {
    super(null);
  }
}
