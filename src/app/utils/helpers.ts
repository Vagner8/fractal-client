export const checkValue = <T>(value: T | null, args?: unknown): T => {
  if (value) return value;
  else {
    const message = `Failed check. Returned value: ${value}. Arguments: ${args}`;
    console.error(message);
    throw new Error(message);
  }
};
