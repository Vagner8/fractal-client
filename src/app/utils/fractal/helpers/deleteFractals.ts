import { IControlDto, IFractal, IFractalDto } from '@types';

export const deleteFractals = (
  parent: IFractal,
  fractals: IFractal[],
  isEditPage: boolean
): { orderChildren: IControlDto | undefined; fractalsToDelete: IFractal[]; fractalsDtoToDelete: IFractalDto[] } => {
  const orderChildren = parent.controls.getKnown('Oc');
  const fractalsToDelete: IFractal[] = [];
  const fractalsDtoToDelete: IFractalDto[] = [];

  for (const fractal of fractals) {
    if (!isEditPage || fractal.$formSelected()) {
      orderChildren?.deleteSplitData(fractal.cursor);
      parent.fractals.delete(fractal.cursor);
      fractalsToDelete.push(fractal);
      fractalsDtoToDelete.push(fractal.dto);
    }
  }

  return { fractalsDtoToDelete, orderChildren: orderChildren?.dto, fractalsToDelete };
};
