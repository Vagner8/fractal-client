import { Fractal } from '@types';

export const push =
  <T>(newItem: T) =>
  (items: T[]): T[] => [...items, newItem];

export const toggleList =
  <T>(newItem: T) =>
  (items: T[]): T[] =>
    items.includes(newItem) ? items.filter(item => item !== newItem) : [...items, newItem];

export const toggleListAll =
  (parent: Fractal) =>
  (items: Fractal[]): Fractal[] =>
    items.length === 0 ? parent.fractals.values : [];
