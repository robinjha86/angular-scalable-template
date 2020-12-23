export interface ServerResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  totalRecords?: number;
  error?: string;
  errorCode?: string;
  warning?: string;
  message: string;
}
