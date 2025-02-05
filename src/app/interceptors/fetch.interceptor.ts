import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export const fetchInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(catchError(error => handleError(error)));
};

export const handleError = (error: HttpErrorResponse): Observable<never> => {
  console.error('🚀 ~ Error:', error.error);
  return throwError(() => new Error(error.error));
};
