// Base api response
export interface IBaseApiResponse {
  success: boolean;
  message: string;
}

// Success api response extend from base api response
export interface ISuccessApiResponse<T> extends IBaseApiResponse {
  data: T | null;
}

// Error api response extend from base api response
export interface IErrorApiResponse<T> extends IBaseApiResponse {
  statusCode: number;
}

// Validation Error api response extend from base api response
export interface IValidationErrorApiResponse<T> extends IBaseApiResponse {
  errors?: T;
}

// Pagination
export interface IPagination {
  current_page: number;
  last_page: number;
  total: number;
  page_size: number;
}
