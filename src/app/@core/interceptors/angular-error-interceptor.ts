import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, Type } from '@angular/core';

import { ErrorLoggerService } from '@core/utils/error-logger.service';
import { astConstants } from '@shared/constants/ast.constant';
import { AstError } from '@shared/typings/ast-error.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AngularErrorInterceptor implements ErrorHandler {
  constructor(
    // Because the ErrorHandler is created before the providers, we'll have to use the Injector to get them.
    private injector: Injector,
  ) { }

  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      // do nothing as we are handling http errors in http interceptor
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      const errorsService = this.injector.get(ErrorLoggerService as Type<ErrorLoggerService>);

      void errorsService.log(error).then(() => this.showToast(astConstants.defaultJavaScriptError));
    }
  }

  private showToast(error: AstError): void {
    const toastr = this.injector.get(ToastrService as Type<ToastrService>);
    toastr.error(error.error, error.message);
  }
}
