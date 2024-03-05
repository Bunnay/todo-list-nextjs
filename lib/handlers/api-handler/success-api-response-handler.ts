import { IBaseApiResponse, ISuccessApiResponse } from "@/types/api";
import ApiResponseHandler from "./api-response-handler";

class SuccessApiResponseHandler<T> extends ApiResponseHandler {
  constructor() {
    super(true, "Successful request!");
  }

  render(): IBaseApiResponse {
    return {
      success: this.success,
      message: this.message,
    };
  }

  withData(data: T): ISuccessApiResponse<T> {
    return {
      success: this.success,
      message: this.message,
      data: data,
    };
  }
}

export default SuccessApiResponseHandler;
