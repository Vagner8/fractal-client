export const checkValue = <T>(value: T | null | undefined, message = 'no message'): T => {
  if (value) return value;
  else {
    const errorMessage = `Failed check. Returned value: ${value}. Message: ${message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const constant = <T extends Readonly<string[]>>(
  values: T
): { [K in T[number]]: K } & { values: T; strings: T[number][]; record: { [K in T[number]]: string } } => {
  const result = Object.fromEntries(values.map(value => [value, value])) as { [K in T[number]]: K };
  return {
    ...result,
    values,
    record: result as { [K in T[number]]: string },
    strings: [...values],
  };
};

export const updateSelectValue = ({ value, data }: { value: string; data: string }): string =>
  [value, ...data.split(':').filter(item => item !== value)].join(':');
