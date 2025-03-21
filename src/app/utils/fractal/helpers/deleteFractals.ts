import { IControlDto, IFractal, IFractalDto } from '@types';

export const deleteFractals = (
  parent: IFractal,
  fractals: IFractal[]
): { orderChildren: IControlDto | undefined; fractalsToDelete: IFractal[]; fractalsDtoToDelete: IFractalDto[] } => {
  const orderChildren = parent.controls.getKnown('Oc');
  const fractalsToDelete: IFractal[] = [];
  const fractalsDtoToDelete: IFractalDto[] = [];

  for (const fractal of fractals) {
    orderChildren?.deleteSplitData(fractal.cursor);
    parent.fractals.delete(fractal.cursor);
    fractalsToDelete.push(fractal);
    fractalsDtoToDelete.push(fractal.dto);
  }

  return { fractalsDtoToDelete, orderChildren: orderChildren?.dto, fractalsToDelete };
};
