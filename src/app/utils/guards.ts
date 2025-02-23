import { Fractal } from '@types';
import { FractalFactory } from './fractal';

export const isFractal = (test: unknown): test is Fractal => test instanceof FractalFactory;
export const isElement = (target: EventTarget | null): target is HTMLElement => target instanceof HTMLElement;
