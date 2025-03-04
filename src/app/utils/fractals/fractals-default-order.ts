import { ConstOrder } from '@constants';
import { Fractal } from '@types';

export const fractalsDefaultOrder = ({ fractals, controls }: Fractal, sort: keyof typeof ConstOrder): string[] =>
  (
    ({
      'Order children': fractals.keys,
      'Order own controls': controls.keys,
      'Order children controls': fractals.values.length > 0 ? fractals.values[0].controls.keys : [],
    }) satisfies Record<keyof typeof ConstOrder, string[]>
  )[sort];
