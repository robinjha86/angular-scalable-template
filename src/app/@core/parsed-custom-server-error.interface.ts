import { astConstants } from '@shared/constants/ast.constant';

export class ParsedCustomServerError {
  error?: string | null;
  warning?: string | null;
  message: string | null;

  constructor(error?: string, message?: string) {
    this.error = error || astConstants.defaultServerError.error;
    this.message = message || astConstants.defaultServerError.message;
  }
}
