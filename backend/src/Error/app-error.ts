class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }

  static EMAIL_ALREADY_EXISTS = new AppError("Email already exists", 400);
  static USER_NOT_FOUND = new AppError("User not found", 404);
  static NOT_FOUND = new AppError("Resource not found", 404);
  static INVALID_CREDENTIALS = new AppError("Invalid email or password", 401);

  static BAD_REQUEST = new AppError("Image file is required", 400);
  static UNAUTHORIZED = new AppError("Unauthorized access", 401);
  static ADMIN_ONLY = new AppError("Admin access required", 403);
  static FORBIDDEN = new AppError("Forbidden", 403);
  static ASSET_NOT_FOUND = new AppError("Asset not found", 404);
  static ASSET_ALREADY_EXISTS = new AppError("Asset already exists", 400);

  static VALIDATION_ERROR = new AppError("Validation failed", 400);
  static INVALID_TOKEN = new AppError("Invalid token", 401);
  static DATABASE_ERROR = new AppError("Database error occurred", 500);
  static INTERNAL_SERVER_ERROR = new AppError("Internal server error", 500);
}

export default AppError;
