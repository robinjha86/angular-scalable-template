
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector, Type } from '@angular/core';
import { Router } from '@angular/router';

import { appApiResources } from '@shared/constants';
import { HelperService } from '@shared/services';
import { User } from '@shared/typings';
import * as StackTraceParser from 'error-stack-parser';
import * as moment from 'moment';
// import * as StackTraceGPS from 'stacktrace-gps';
import { ParsedError } from '../interceptors/parsed-error.interface';

// Cool library to deal with errors: https://www.stacktracejs.com

@Injectable()
export class ErrorLoggerService {
  constructor(private injector: Injector, private http: HttpClient) { }
  async log(error: Error): Promise<ParsedError> {
    // const parsedStackInfo = await this.parseErrorStack(error);
    const parsedError = this.addContextInfo(error);

    this.logToConsole(error, parsedError);

    if (appApiResources.logError) {
      // Send error to server
      await this.http.post<ParsedError>(appApiResources.logError, parsedError).toPromise();
      return parsedError;
    } else {
      // API to log error not available
      await new Promise<ParsedError>((resolve) => {
        setTimeout(() => {
          resolve(parsedError);
        }, 0);
      });
      return parsedError;
    }
  }

  addContextInfo(error: Error): ParsedError {
    // All the context details that you want (usually coming from other services; Constants, UserService...)
    const errorName: string | null = error.name || null;
    const appId = '';
    const userLs: string | null = localStorage.getItem('user');
    let user: User = {};
    if (userLs) {
      user = JSON.parse(userLs) as User;
    }
    const { id, email, name } = user || { id: '', email: '', name: '' };
    const time: string = moment.utc().toISOString();

    const router = this.injector.get(Router as Type<Router>);
    const angularRoute = router.url;

    const message: string = error.message || error.toString();
    const stackFrames =
      error instanceof HttpErrorResponse ? null : StackTraceParser.parse(error);

    return {
      errorName,
      appId,
      name,
      email,
      id,
      time,
      angularRoute,
      message,
      stackFrames,
      // parsedStackInfo,
      originalErrorStack: JSON.stringify(error.stack),
    };
  }

  // async parseErrorStack(error: any) {
  //   /*
  //    * Parse error to parses and extracts function names, URLs, line numbers, and column numbers from
  //    * the given Error's stack as an Array of StackFrames.
  //    * More Info: https://www.stacktracejs.com/#!/docs/error-stack-parser
  //    */
  //   const parsedStackedFrames: any[] = StackTraceParser.parse(error);
  //   const stackFrame = parsedStackedFrames[0];

  //   /*
  //    * Better location/name information from source maps with stacktrace-gps
  //    * More Info: https://www.stacktracejs.com/#!/docs/stacktrace-gps
  //    */
  //   let errorMappedLocation: ParsedClientErrorStack = {} as any;
  //   let errorPinpoint: ParsedClientErrorStack = {} as any;
  //   let errorFunctionName: ParsedClientErrorStack = {} as any;
  //   // const gps = new StackTraceGPS();
  //   try {
  //     errorMappedLocation = await gps.getMappedLocation(stackFrame);
  //   } catch (err) {
  //     errorMappedLocation.isFailedToParse = true;
  //     errorMappedLocation.parseFailedStack = err.toString();
  //   }

  //   try {
  //     errorPinpoint = await gps.pinpoint(stackFrame);
  //   } catch (err) {
  //     errorPinpoint.isFailedToParse = true;
  //     errorPinpoint.parseFailedStack = err.toString();
  //   }

  //   try {
  //     errorFunctionName = await gps.findFunctionName(stackFrame);
  //   } catch (err) {
  //     errorFunctionName.isFailedToParse = true;
  //     errorFunctionName.parseFailedStack = err.toString();
  //   }

  //   return { errorMappedLocation, errorPinpoint, errorFunctionName };
  //   /*
  //    * Sourcemapped stacktrace:
  //    * https://stackoverflow.com/questions/42095429/error-stacktrace-with-angular-2-and-webpack-2#answer-42160797
  //    * More Info: https://github.com/novocaine/sourcemapped-stacktrace
  //    */
  //   // pass e.stack to window.mapStackTrace
  //   // SourcemappedStacktrace.mapStackTrace(error.stack, function (mappedStack) {
  //   //   // do what you want with mappedStack here
  //   //   console.log('mapStackTrace',mappedStack.join("\n"));
  //   // });
  // }

  private logToConsole(error: Error, parsedError: ParsedError) {
    const helperService = this.injector.get(HelperService as Type<HelperService>);
    if (helperService.isDevEnv()) {
      console.error('Original Error: ', error);
      console.error('Parsed Error: ', parsedError);
    } else {
      console.error(error);
    }
  }
}
