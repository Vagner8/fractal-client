import { IFractal, IFractalsState } from '@types';
import { ArrayState } from './array.state';

export class FractalsState extends ArrayState<IFractal> implements IFractalsState {}
