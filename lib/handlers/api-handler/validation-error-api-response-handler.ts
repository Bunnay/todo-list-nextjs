import { IValidationErrorApiResponse } from "@/types/api";
import ApiResponseHandler from "./api-response-handler";

class ValidationErrorApiResponseHandler<T> extends ApiResponseHandler {
  public errors: T;

  constructor(errors: T) {
    super(false, "The data is invalid!");
    this.errors = errors;
  }

  render(): IValidationErrorApiResponse<T> {
    return {
      success: this.success,
      message: this.message,
      errors: this.errors,
    };
  }
}

export default ValidationErrorApiResponseHandler;
