import { Control, Fractal } from '@types';
import { FractalFactory } from './fractal.factory';
import { WORDS } from '@constants';
import { ControlFactory } from './control.factory';

export const CollectionChildFactory = (parent: Fractal): Fractal => {
  const child = new FractalFactory({ cursor: WORDS.NEW, parentCursor: parent.cursor }, parent);
  child.$newControls.set(createChildControls(child));
  return child;
};

export const createChildControls = (parent: Fractal): Control[] => {
  const occ = parent?.parent?.getArray('Occ');
  if (occ && occ.length > 0) {
    return occ.map(cursor => {
      const type = parent?.parent?.findChild(['1'])?.findControl([cursor])?.type;
      return new ControlFactory(parent, { cursor, type });
    });
  } else {
    return [new ControlFactory(parent, { cursor: WORDS.NEW })];
  }
};
