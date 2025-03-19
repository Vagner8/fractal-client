import { IControlDto, IFractal, IFractalDto } from '@types';

export const deleteFractals = (
  parent: IFractal,
  fractals: IFractal[]
): { fractalsToDelete: IFractalDto[]; orderChildren: IControlDto | undefined } => {
  const orderChildren = parent.controls.getKnown('Oc');

  const fractalsToDelete = fractals.map(({ dto, cursor }) => {
    orderChildren?.deleteSplitData(cursor);
    parent.fractals.delete(cursor);
    return dto;
  });

  return { fractalsToDelete, orderChildren: orderChildren?.dto };
};
