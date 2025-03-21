import { IControl, IControlsState } from '@types';
import { ArrayState } from './abstract-states/array-state';

export class ControlsState extends ArrayState<IControl> implements IControlsState {}
