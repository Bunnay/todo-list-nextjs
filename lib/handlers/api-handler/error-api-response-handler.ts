import { IErrorApiResponse } from "@/types/api";
import ApiResponseHandler from "./api-response-handler";

class ErrorApiResponseHandler extends ApiResponseHandler {
  public statusCode: number;

  constructor(statusCode: number = 500, message?: string) {
    super(false, message || "Internal server error!");
    this.statusCode = statusCode;

    this.render();
  }

  render(): IErrorApiResponse {
    return {
      success: this.success,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export default ErrorApiResponseHandler;
