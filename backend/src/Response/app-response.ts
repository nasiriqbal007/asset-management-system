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
    const payload = data || this.data;
    return res.status(this.statusCode).json({
      success: true,
      message: this.message,
      payload,
    });
  }

  static USER_REGISTERED = new AppResponse("User registered successfully", 201);
  static LOGIN_SUCCESSFUL = new AppResponse("Login successful", 200);
  static PROFILE_RETRIEVED = new AppResponse(
    "Profile retrieved successfully",
    200,
  );
  static GET_ALL_EMP = new AppResponse(
    "Retrieved all employees successfully",
    200,
  );
  static TOTAL_EMP = new AppResponse("Total employees fetched", 200);
  static TOTAL_ASSETS = new AppResponse("Total assets fetched", 200);
  static TOTAL_ALLOCATED = new AppResponse(
    "Total allocated assets fetched",
    200,
  );
  static TOTAL_AVAILABLE = new AppResponse(
    "Total available assets fetched",
    200,
  );
  static TOTAL_PENDING = new AppResponse("Total pending requests fetched", 200);
  static DASHBOARD_STATUS_SUMMARY = new AppResponse(
    "Dashboard status summary fetched",
    200,
  );
  static GET_ALL_Assets = new AppResponse(
    "Retrieved all assets successfully",
    200,
  );
  static GET_ALL_ALLOCATIONS = new AppResponse(
    "Retrieved all allocations successfully",
    200,
  );
  static ACTIVITY_LOGS = new AppResponse("All activity logs fetched", 200);
  static GET_ALL_REQ = new AppResponse("Retrieved all data successfully", 200);
  static ITEM_CREATED = new AppResponse("Item created successfully", 201);
  static Item_BY_ID = new AppResponse("Retrieved one item successfully", 200);
  static UPDATED_ITEM = new AppResponse("Item updated successfully", 200);
  static DELETED_ITEM = new AppResponse("Item deleted successfully", 200);
  static DELETED_USER = new AppResponse("User deleted successfully", 200);
  static PROFILE_UPDATED = new AppResponse("Profile updated successfully", 200);
}

export default AppResponse;
