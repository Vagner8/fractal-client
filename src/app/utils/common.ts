import { ConstSeparator } from '@constants';

export const constant = <T extends Readonly<string[]>>(
  values: T
): { [K in T[number]]: K } & { values: T; strings: string[]; record: { [K in T[number]]: string } } => {
  const result = Object.fromEntries(values.map(value => [value, value])) as { [K in T[number]]: K };
  return {
    ...result,
    values,
    record: result as { [K in T[number]]: string },
    strings: [...values],
  };
};

export const updateSelectValue = ({ value, data }: { value: string; data: string }): string =>
  [value, ...data.split(ConstSeparator).filter(item => item !== value)].join(ConstSeparator);
