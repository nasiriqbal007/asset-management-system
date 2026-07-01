export type ReqStatus = "pending" | "approved" | "rejected";

export type AssetRequest = {
  id: number;
  employee_id: number;
  employee_name: string;
  asset_id: number;
  asset_name: string;
  request_reason: string;
  status: ReqStatus;
  created_at: string;
};

export type CreateAssetRequestInput = Omit<
  AssetRequest,
  "id" | "created_at" | "status" | "employee_name" | "asset_name"
> & {
  status?: ReqStatus;
};
