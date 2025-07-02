import { ControlDto, Fractal } from '@types';
import { FractalFactory } from './fractal.factory';
import { WORDS } from '@constants';

export const CollectionChildFactory = (parent: Fractal): Fractal => {
  const child = new FractalFactory(parent, { cursor: WORDS.NEW, parentCursor: parent.cursor });
  child.$newControls.set(createControlsDto(child));
  return child;
};

export const createControlsDto = (parent: Fractal): ControlDto[] => {
  const occ = parent.parent.getArray('Occ');
  if (occ.length > 0) {
    const firsChild = parent.parent.getChild(['1']);
    return occ.map(cursor => {
      const { type } = firsChild.getControl([cursor]);
      return { cursor, parentCursor: parent.cursor, data: '', type };
    });
  } else {
    return [{ cursor: WORDS.NEW, parentCursor: parent.cursor, data: '', type: 'String' }];
  }
};
