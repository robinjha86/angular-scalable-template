import * as StackTraceParser from 'error-stack-parser';

export interface ParsedError {
    errorName: string | null;
    appId: string;
    name: any;
    email: any;
    id: any;
    time: string;
    angularRoute: string;
    message: string;
    stackFrames: StackTraceParser.StackFrame[] | null;
    parsedStackInfo?: any;
    originalErrorStack: string;
}