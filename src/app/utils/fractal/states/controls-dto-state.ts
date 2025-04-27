import { IControlDto, IControlsDtoState } from '@types';
import { ArrayState } from './abstract-states/array-state';

export class ControlsDtoState extends ArrayState<IControlDto> implements IControlsDtoState {}
