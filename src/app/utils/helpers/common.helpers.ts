import { NavigationEnd } from '@angular/router';
import { QUERY_PARAMS } from '@constants';
import { ConstantsValues } from '@types';

export const parseSearch = (search: string | [string]): string => (typeof search === 'string' ? search : search[0]);

export const getSegments = (
  event: NavigationEnd
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
