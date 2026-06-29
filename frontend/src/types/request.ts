export type ReqStatus = "pending" | "approved" | "rejected";

export type AssetRequest = {
  id: number;
  employee_id: number;
  asset_id: number;
  request_reason: string;
  status: ReqStatus;
  created_at: string;
};

export type CreateAssetRequestInput = Omit<AssetRequest, "id" | "created_at" | "status"> & {
  status?: ReqStatus;
};
export type UpdateAssetRequestInput = {
  status: ReqStatus;
};
