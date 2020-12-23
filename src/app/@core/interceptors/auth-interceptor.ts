import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor,
    HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { includes } from 'lodash';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let successResponse: HttpResponse<any>;
    let errorResponse: HttpErrorResponse;
    const isRequestToAuthAPI = !!(includes(req.url, '/login') || includes(req.url, '/register'));
    const tokenLs = localStorage.getItem('token');
    const addTokenToReq = !isRequestToAuthAPI && !!tokenLs;
    const token = addTokenToReq ? localStorage.getItem('token') : '';
    const headers: HttpHeaders = addTokenToReq ? req.headers.set('Authorization', `Bearer ${token}`) : req.headers;
    const reqUpdate = addTokenToReq ? { headers } : {};

    // Clone the request and replace the original
    return next.handle(req.clone(reqUpdate)).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        (event) => {
          if (event instanceof HttpResponse) {
            successResponse = event;
          }
        },
        // Operation failed; error is an HttpErrorResponse
        (error) => {
          if (error instanceof HttpErrorResponse) {
            errorResponse = error;
          }
        },
      ),
      // Handle auth errors
      finalize(() => {
        const isAuthError = errorResponse && !!(errorResponse.status === 401 || errorResponse.status === 403);
        if (isAuthError) {
          localStorage.clear();
          window.location.href = '#login';
        }
      }),
    );
  }
}
