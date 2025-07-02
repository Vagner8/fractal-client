import { Control, Fractal } from '@types';
import { FractalFactory } from './fractal.factory';
import { WORDS } from '@constants';
import { ControlFactory } from './control.factory';

export const CollectionChildFactory = (parent: Fractal): Fractal => {
  const child = new FractalFactory(parent, { cursor: WORDS.NEW, parentCursor: parent.cursor });
  child.$newControls.set(createChildControls(child));
  return child;
};

export const createChildControls = (parent: Fractal): Control[] => {
  const occ = parent.parent.getArray('Occ');
  if (occ.length > 0) {
    const firsChild = parent.parent.getChild(['1']);
    return occ.map(cursor => {
      const { type } = firsChild.getControl([cursor]);
      return new ControlFactory(parent, { cursor, type });
    });
  } else {
    return [new ControlFactory(parent, { cursor: WORDS.NEW })];
  }
};
