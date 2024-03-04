import { IBaseApiResponse } from "@/types/api";

class ApiResponseHandler {
  public success: boolean;
  public message: string;

  constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;

    this.render();
  }

  render(): IBaseApiResponse {
    return {
      success: this.success,
      message: this.message,
    };
  }
}

export default ApiResponseHandler;
