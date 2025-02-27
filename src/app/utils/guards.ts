import { Fractal } from '@types';
import { FractalFactory } from './fractals';

export const isFractal = (value: unknown): value is Fractal => value instanceof FractalFactory;
