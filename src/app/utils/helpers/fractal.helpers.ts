import { Children, ChildrenDto, Fractal, SearchFractals } from '@types';
import { parseSearch } from './common.helpers';
import { FractalBase } from '../fractal-base';

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

export const createFractals = (children: ChildrenDto | null, parent: Fractal): Children => {
  const result: Children = {};
  for (const cursor in children) {
    const fractalDto = children[cursor];
    const fractal = new FractalBase(fractalDto, parent);
    result[cursor] = fractal;
    fractal.children = createFractals(fractalDto.children, fractal);
  }
  return result;
};
