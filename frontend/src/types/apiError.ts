export type ApiError = {
  success: false;
  error: {
    statusCode: number;
    message: string;
  };
};
