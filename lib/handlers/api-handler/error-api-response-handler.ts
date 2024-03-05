import { IErrorApiResponse } from "@/types/api";
import ApiResponseHandler from "./api-response-handler";

class ErrorApiResponseHandler<T> extends ApiResponseHandler {
  public statusCode: number;

  constructor(statusCode: number = 500) {
    super(false, "Internal server error!");
    this.statusCode = statusCode;
  }

  render(): IErrorApiResponse<T> {
    return {
      success: this.success,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export default ErrorApiResponseHandler;
