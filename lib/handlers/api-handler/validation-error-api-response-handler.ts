import { IValidationErrorApiResponse } from "@/types/api";
import ApiResponseHandler from "./api-response-handler";

class ValidationErrorApiResponseHandler<T> extends ApiResponseHandler {
  public errors: T;

  constructor(errors: T, message?: string) {
    super(false, message || "The data is invalid!");
    this.errors = errors;

    this.render();
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
