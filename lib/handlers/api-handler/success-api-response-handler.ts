import { ISuccessApiResponse } from "@/types/api";
import ApiResponseHandler from "./api-response-handler";

class SuccessApiResponseHandler<T> extends ApiResponseHandler {
  public data: T;

  constructor(data: T) {
    super(true, "Successful request!");
    this.data = data;
  }

  render(): ISuccessApiResponse<T> {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }
}

export default SuccessApiResponseHandler;
