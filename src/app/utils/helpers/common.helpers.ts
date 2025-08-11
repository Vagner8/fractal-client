import { NavigationEnd } from '@angular/router';
import { QUERY_PARAMS } from '@constants';
import { ConstantsValues, Timeout } from '@types';

export const getSegments = (
  event: NavigationEnd,
): {
  collectionParam: string;
  editorParam: string;
  queryParams: Partial<Record<ConstantsValues<typeof QUERY_PARAMS>, string>>;
} => {
  const url = new URL(event.urlAfterRedirects, window.location.origin);
  const [collectionParam, editorParam] = url.pathname.split('/').filter(Boolean);

  const queryParams: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  return { collectionParam, editorParam, queryParams };
};

export const debounce = <T extends (...args: unknown[]) => void>(fn: T, delay: number) => {
  let timeoutId: Timeout;
  return (...args: unknown[]): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
