export type Employee = {
  id: number;
  name: string;
  email: string;
  department: string;
  department_id: number;
  role: "admin" | "employee";
  created_at: string;
};

export type EmployeeCreateInput = Omit<Employee, "id" | "created_at"> & {
  password: string;
};
export type EmployeeUpdateInput = Partial<EmployeeCreateInput> & { id: number };
export type EmpQueryParams = {
  name?: string;
  department_id?: number;
  page?: number;
  limit?: number;
};
