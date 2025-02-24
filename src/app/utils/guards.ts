import { Fractal } from '@types';
import { AbstractFractal, CollectionFractal, FractalFactory } from './fractal';

export const isFractal = (test: unknown): test is Fractal => test instanceof FractalFactory;
export const isCollection = (fractal: AbstractFractal): fractal is CollectionFractal =>
  fractal instanceof CollectionFractal;
