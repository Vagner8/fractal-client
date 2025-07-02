import { Children, ChildrenDto, Fractal, SearchFractals } from '@types';
import { parseSearch } from './common.helpers';
import { FractalFactory } from '../factories/fractal.factory';

export const findChildRecursively: SearchFractals<Fractal | null> = (search, children) => {
  if (!children) return null;
  const child = children[parseSearch(search)];

  if (child) {
    return child;
  }

  for (const child of Object.values(children)) {
    const result = findChildRecursively(search, child.children);
    if (result) return result;
  }

  return null;
};

export const createChildren = (parent: Fractal, children?: ChildrenDto): Children | undefined => {
  if (!children) return undefined;

  const result: Children = {};

  for (const [cursor, fractalDto] of Object.entries(children)) {
    const fractal = new FractalFactory(parent, fractalDto);
    fractal.children = createChildren(fractal, fractalDto.children);
    result[cursor] = fractal;
  }

  return result;
};
