import { WritableSignal } from '@angular/core';
import { Fractal } from '@types';

export const checkValue = <T>(value: T | null, text = 'no message'): T => {
  if (value) return value;
  else {
    const message = `Failed check. Returned value: ${value}. Message: ${text}`;
    console.error(message);
    throw new Error(message);
  }
};

export const constant = <T extends readonly string[]>(
  values: T
): Record<T[number], T[number]> & { values: T; strings: string[] } => {
  const strings: string[] = [];
  const value = Object.fromEntries(
    values.map(value => {
      strings.push(value);
      return [value, value];
    })
  ) as Record<T[number], T[number]>;
  return {
    ...value,
    values,
    strings,
  };
};

export const updateSelectValue = ({ value, data }: { value: string; data: string }): string =>
  [value, ...data.split(':').filter(item => item !== value)].join(':');

export const doesSignalHasArray = (
  signal: WritableSignal<(Fractal | null) | Fractal[]>
): signal is WritableSignal<Fractal[]> => Array.isArray(signal());
