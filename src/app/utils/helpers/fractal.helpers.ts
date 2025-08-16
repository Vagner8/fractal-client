import { Children, ChildrenDto, Fractal } from '@types';
import { FractalFactory } from '../factories/fractal.factory';
import { WritableSignal } from '@angular/core';

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

export const getAncestors =
  (fractal: WritableSignal<Fractal | null>): (() => Fractal[]) =>
  (): Fractal[] => {
    const selectedFractal = fractal();
    const ancestors: Fractal[] = [];
    if (selectedFractal) {
      let current: Fractal | undefined | null = selectedFractal.parent;
      while (current) {
        if (current) {
          ancestors.unshift(current);
        }
        current = current?.parent;
      }
    }
    return ancestors;
  };
