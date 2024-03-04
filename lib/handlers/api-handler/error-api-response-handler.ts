import { IErrorApiResponse } from "@/types/api";
import ApiResponseHandler from "./api-response-handler";

class ErrorApiResponseHandler<T> extends ApiResponseHandler {
  constructor() {
    super(false, "Internal server error!");
  }

  render(): IErrorApiResponse<T> {
    return {
      success: this.success,
      message: this.message,
    };
  }
}

export default ErrorApiResponseHandler;
