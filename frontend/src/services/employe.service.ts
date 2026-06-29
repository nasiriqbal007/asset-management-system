import api from "../api/api";
import type {
  EmployeeCreateInput,
  EmployeeUpdateInput,
} from "../types/employee";

export const getAllEmployeeList = () => api.get("employees");
export const createEmployee = (data: EmployeeCreateInput) =>
  api.post("employees", data);
export const updateEmployee = (data: EmployeeUpdateInput) =>
  api.patch(`employees/${data.id}`, data);
export const deleteEmployee = (id: number) => api.delete(`employees/${id}`);
