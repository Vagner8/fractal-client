import { IndicatorData } from '@types';

export const getIndicatorData = (indicatorData: IndicatorData): string =>
  typeof indicatorData === 'string' ? indicatorData : indicatorData[0];

export const deleteSubstring = (str: string, substr: string): string => {
  return str
    .split(':')
    .filter(char => char !== substr)
    .join(':');
};
