import { IControl, IControlsState } from '@types';
import { ArrayState } from './array.state';

export class ControlsState extends ArrayState<IControl> implements IControlsState {}
