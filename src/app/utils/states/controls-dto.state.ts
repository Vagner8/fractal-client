import { IControlDto, IControlsDtoState } from '@types';
import { ArrayState } from './array.state';

export class ControlsDtoState extends ArrayState<IControlDto> implements IControlsDtoState {}
