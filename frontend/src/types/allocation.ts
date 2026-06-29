export type Allocation = {
  id: number;
  employee_id: number;
  asset_id: number;
  allocated_date: string;
  returned_date: string | null;
};

export type CreateAllocationInput = Omit<Allocation, "id" | "allocated_date" | "returned_date">;
export type UpdateAllocationInput = Partial<CreateAllocationInput>;
