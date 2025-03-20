import { IControl, IFractal, IFractalDto } from '@types';

interface addFractalProps {
  parent: IFractal;
  fractal: IFractal;
  orderChildren: IControl;
}

export const addFractal = ({ parent, fractal, orderChildren }: addFractalProps): IFractalDto => {
  const cursor = fractal.controls.getKnown('Cursor')?.getFromControl('data').value;
  fractal.form.markAsPristine();
  fractal.cursor = cursor;
  parent.fractals.set(cursor, fractal);
  orderChildren?.pushSplitData(cursor);
  return fractal.dto;
};
