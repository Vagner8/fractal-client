import { ControlDto, Fractal, SearchControlsProp, SearchFractalsProp } from '@types';

export const parseSearch = (search: string | [string]): string => (typeof search === 'string' ? search : search[0]);

export const ensureFractalExists = (
  fractal: Fractal | undefined | null,
  search: SearchControlsProp | SearchFractalsProp
): Fractal => {
  if (fractal) {
    return fractal;
  }
  throw new Error(`Unable to get a fractal by: ${search}`);
};

export const ensureControlDtoExists = (
  controlDto: ControlDto | null,
  search: SearchControlsProp | SearchFractalsProp
): ControlDto => {
  if (controlDto) {
    return controlDto;
  }
  throw new Error(`Unable to get a control by: ${search}`);
};

export const ensureExists = <T>(value: T | undefined): T => {
  if (value) {
    return value;
  }
  throw new Error('Value is not exist');
};
