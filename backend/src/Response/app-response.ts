class AppResponse {
  message: string;
  statusCode: number;
  data?: any;

  constructor(message: string, statusCode: number, data?: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }

  send(res: any, data?: any) {
    return res.status(this.statusCode).json({
      success: true,
      message: this.message,
      data: data || this.data,
    });
  }

  static USER_REGISTERED = new AppResponse("User registered successfully", 201);
  static LOGIN_SUCCESSFUL = new AppResponse("Login successful", 200);
  static PROFILE_RETRIEVED = new AppResponse(
    "Profile retrieved successfully",
    200,
  );
  static PROFILE_UPDATED = new AppResponse("Profile updated successfully", 200);
}

export default AppResponse;
