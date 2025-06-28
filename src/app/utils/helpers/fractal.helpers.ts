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

export const createChildren = (children: ChildrenDto | null, parent: Fractal): Children | null => {
  if (!children) return null;

  const result: Children = {};

  for (const [cursor, fractalDto] of Object.entries(children)) {
    const fractal = new FractalBase(fractalDto, parent);
    fractal.children = createChildren(fractalDto.children, fractal);
    result[cursor] = fractal;
  }

  return result;
};
