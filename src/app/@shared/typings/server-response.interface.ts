export interface ServerResponse {
  data: any;
  totalRecords?: number;
  error?: string;
  errorCode?: string;
  warning?: string;
  message: string;
}
