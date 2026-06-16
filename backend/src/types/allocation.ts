export type AssetAllocation = {
  id: number;
  employee_id: number;
  asset_id: number;
  allocated_date: Date;
  return_date: Date;
};

export type createAllocationInput = {
  employee_id: number;
  asset_id: number;
};
