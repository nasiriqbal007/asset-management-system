export type ReqStatus = "pending" | "approved" | "rejected";
export type AssetRequest = {
  id: number;
  employee_id: number;
  asset_id: number;
  request_reason: string;
  status: ReqStatus;
  created_at: string;
};

export type CreateAssetRequestInput = {
  employee_id: number;
  asset_id: number;
  request_reason: string;
  status?: ReqStatus;
};
export type UpdateAssetRequestInput = {
  status: ReqStatus;
};
