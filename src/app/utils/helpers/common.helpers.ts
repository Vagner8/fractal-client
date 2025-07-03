export const parseSearch = (search: string | [string]): string => (typeof search === 'string' ? search : search[0]);
