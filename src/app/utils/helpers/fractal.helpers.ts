import { Children, ChildrenDto, Fractal } from '@types';
import { FractalFactory } from '../factories/fractal.factory';

export const findChildRecursively = (cursor: string, children?: Children): Fractal | null => {
  if (!children) {
    return null;
  }
  const fractal = children[cursor];

  if (fractal) {
    return fractal;
  }

  for (const child of Object.values(children)) {
    const result = findChildRecursively(cursor, child.children);
    if (result) {
      return result;
    }
  }

  return null;
};

export const createChildren = (parent: Fractal, children?: ChildrenDto): Children | undefined => {
  if (!children) {
    return undefined;
  }

  const result: Children = {};

  for (const [cursor, fractalDto] of Object.entries(children)) {
    const fractal = new FractalFactory(fractalDto, parent);
    fractal.children = createChildren(fractal, fractalDto.children);
    result[cursor] = fractal;
  }

  return result;
};
