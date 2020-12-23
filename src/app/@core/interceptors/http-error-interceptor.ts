import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpErrorHandlerService } from '../utils/http-error-handler.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorHandler: HttpErrorHandlerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            if (event.body && typeof event.body === 'object'
              && (event.body.error || event.body.errorCode || event.body.warning)) {
              return this.errorHandler.handleCustomServerError(event);
            }
            return event;
          }
          return null;
        },
        // Operation failed; error is an HttpErrorResponse
        (error: HttpErrorResponse) => this.errorHandler.handleErrorResponse(error)
      )
    );
  }
}
