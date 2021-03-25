export interface Response {
  status: boolean;
  data?: any;
  msg?: string;
}

export interface DatabaseResponse {
  status: boolean;
  data?: any;
  msg?: string;
  pageIndex?: number;
  pageSize?: number;
  total?: number;
}