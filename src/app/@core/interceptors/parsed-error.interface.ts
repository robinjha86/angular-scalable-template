import * as StackTraceParser from 'error-stack-parser';

export interface ParsedError {
    errorName: string | null;
    appId: string;
    name?: string;
    email?: string;
    id?: string;
    time: string;
    angularRoute: string;
    message: string;
    stackFrames: StackTraceParser.StackFrame[] | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parsedStackInfo?: any;
    originalErrorStack: string;
}