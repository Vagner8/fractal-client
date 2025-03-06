import { IFractal } from '@types';
import { Fractal } from './fractals';

export const isFractal = (value: unknown): value is IFractal => value instanceof Fractal;
