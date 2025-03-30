import { IBoolState } from '@types';
import { BaseState } from './abstract-states/base-state';

export class BoolState extends BaseState<boolean> implements IBoolState {
  toggle(): void {
    this.set(!this.value);
  }
}
