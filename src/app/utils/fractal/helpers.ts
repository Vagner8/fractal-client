import { FractalFactory } from 'app/utils/fractal';
import { ControlDto, ControlsDto, Fractal, Fractals, FractalsDto, NewControlForm, SortMode } from '@types';
import { ConstControlFormKeys, ConstSplitIndicators } from '@constants';
import { v4 } from 'uuid';

export const createFractalsRecursively = (fractalsDto: FractalsDto | null, parent: Fractal): Fractals | null => {
  if (!fractalsDto) return null;
  const result: Fractals = {};
  for (const indicator in fractalsDto) {
    const fractal = new FractalFactory({ parent, dto: fractalsDto[indicator] });
    fractal.fractals = createFractalsRecursively(fractalsDto[indicator].fractals, fractal);
    result[indicator] = fractal;
  }
  return result;
};

export const findFractalRecursively = (test: string, fractals: Fractals | null): Fractal | null => {
  if (fractals) {
    for (const key in fractals) {
      if (fractals[key].is(test) || fractals[key].dto.id === test) return fractals[key];
      const found = findFractalRecursively(test, fractals[key].fractals);
      if (found) return found;
    }
  }
  return null;
};

export const getFractalSort = (fractal: Fractal, mode: SortMode): string[] => {
  const { dto, parent, isItem } = fractal;
  const handle: Record<SortMode, () => string[]> = {
    form() {
      if (isItem) {
        const parentSort = parent.splitControlData(ConstSplitIndicators.Sort);
        return parentSort.length > 0 ? parentSort : Object.keys(parent.dto.fractals || {});
      }
      return Object.keys(dto.controls);
    },
    table() {
      if (isItem) throw new Error('The item table sort is not supported');
      const ownSort = fractal.splitControlData(ConstSplitIndicators.Sort);
      return ownSort.length > 0 ? ownSort : Object.keys(dto.fractals || {});
    },
    tableControl() {
      return ConstControlFormKeys.strings;
    },
  };

  return handle[mode]();
};

export const createControlDto = (parentId: string): ControlDto => {
  return {
    id: v4(),
    parentId,
    data: '',
    input: '',
    indicator: '',
  };
};

export const createControlsDto = (forms: NewControlForm[], parentId: string): ControlsDto => {
  return forms.reduce((acc: ControlsDto, form) => {
    const indicator = form.value[ConstControlFormKeys.indicator];
    acc[indicator] = createControlDto(parentId);
    ConstControlFormKeys.values.forEach(key => (acc[indicator][key] = form.value[key]));
    return acc;
  }, {});
};
