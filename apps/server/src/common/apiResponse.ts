export class ApiResponse<T> {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: T,
    public error?: string,
  ) {}

  static success<T>(data: T, statusCode = 200, message = 'Success'): ApiResponse<T> {
    return new ApiResponse<T>(statusCode, message, data);
  }

  static error<T>(error?: string, statusCode = 500, message = 'Error'): ApiResponse<T> {
    return new ApiResponse<T>(statusCode, message, undefined, error);
  }
}
