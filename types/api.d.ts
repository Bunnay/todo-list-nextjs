// Base api response
export interface BaseApiResponse {
  success: boolean;
  message: string;
}

// Success api response extend from base api response
export interface SuccessApiResponse<T> extends BaseApiResponse {
  data: T;
  pagination?: Pagination;
}

// Error api response extend from base api response
export interface ErrorApiResponse<T> extends BaseApiResponse {
  errors?: T;
}

// Pagination
export interface Pagination {
  current_page: number;
  last_page: number;
  total: number;
  page_size: number;
}
