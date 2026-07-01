export type Allocation = {
  id: number;
  employee_id: number;
  employee_name: string;
  asset_name: string;
  asset_id: number;
  allocated_date: string;
  returned_date: string | null;
};

export type ReturnAsset = {
  returned_date: string;
};
