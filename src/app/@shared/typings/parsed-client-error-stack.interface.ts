
export interface ParsedClientErrorStack {
  columnNumber: number;
  fileName: string;
  functionName: string;
  lineNumber: number;
  message?: string;
  stack: string;
  url?: string;
  isFailedToParse?: boolean;
  parseFailedStack?: string;
}
