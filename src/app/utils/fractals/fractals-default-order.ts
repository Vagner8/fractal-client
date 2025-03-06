import { ConstOrder } from '@constants';
import { IFractal } from '@types';

export const fractalsDefaultOrder = ({ fractals, controls }: IFractal, sort: keyof typeof ConstOrder): string[] => {
  const firstFractal = fractals.first;
  return (
    {
      'Order children': fractals.arrKeys,
      'Order own controls': controls.arrKeys,
      'Order children controls': firstFractal ? firstFractal.controls.arrKeys : [],
    } satisfies Record<keyof typeof ConstOrder, string[]>
  )[sort];
};
