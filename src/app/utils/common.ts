import { ConstSeparator } from '@constants';

export const updateSelectValue = ({ value, data }: { value: string; data: string }): string =>
  [value, ...data.split(ConstSeparator).filter(item => item !== value)].join(ConstSeparator);
