import { IndicatorData } from '@types';

export const getIndicatorData = (indicatorData: IndicatorData): string =>
  typeof indicatorData === 'string' ? indicatorData : indicatorData[0];
