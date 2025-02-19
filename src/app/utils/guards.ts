import { Fractal } from '@types';
import { FractalFactory } from './fractal';

export const isFractal = (test: unknown): test is Fractal => test instanceof FractalFactory;
export const isClosestMatField = (target: EventTarget | null): target is HTMLElement =>
  Boolean(target instanceof HTMLElement && target.closest('.mat-mdc-text-field-wrapper'));
