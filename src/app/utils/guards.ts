import { Fractal, FractalCollection } from '@types';
import { FractalCollectionFactory, FractalFactory } from './fractal';

export const isFractal = (value: unknown): value is Fractal => value instanceof FractalFactory;
export const isCollection = (value: Fractal | null): value is FractalCollection =>
  value instanceof FractalCollectionFactory;
