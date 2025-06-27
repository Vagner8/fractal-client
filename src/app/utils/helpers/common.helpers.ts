import { SearchControlsProp, SearchFractalsProp } from '@types';

export const parseSearch = (search: string | [string]): string => (typeof search === 'string' ? search : search[0]);

export const ensureControlDtoExists = <T>(controlDto: T | null, search: SearchControlsProp | SearchFractalsProp): T => {
  if (controlDto) {
    return controlDto;
  }
  throw new Error(`Unable to get the data by: ${search}`);
};

export const ensureExists = <T>(value: T | undefined): T => {
  if (value) {
    return value;
  }
  throw new Error('Value is not exist');
};
