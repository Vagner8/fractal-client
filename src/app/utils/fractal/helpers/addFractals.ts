import { IControlDto, IFractal, IFractalDto } from '@types';

export const addFractals = (
  parent: IFractal,
  newFractals: IFractal[]
): { fractalsToAdd: IFractalDto[]; orderChildren: IControlDto | undefined } => {
  const orderChildren = parent.controls.getKnown('Oc');

  const fractalsToAdd = newFractals.reduce((acc: IFractalDto[], child) => {
    if (child.form.dirty) {
      child.form.markAsPristine();
      const cursor = child.controls.getKnown('Cursor')?.getFromControl('data').value;
      child.cursor = cursor;
      if (cursor && orderChildren) {
        parent.fractals.set(cursor, child);
        orderChildren.pushSplitData(cursor);
        acc.push(child.dto);
      }
    }
    return acc;
  }, []);

  return { fractalsToAdd, orderChildren: orderChildren?.dto };
};
