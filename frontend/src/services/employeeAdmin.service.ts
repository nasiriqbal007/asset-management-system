import api from "../api/api";
import type {
  EmployeeCreateInput,
  EmployeeUpdateInput,
  EmpQueryParams,
} from "../types/employee";

export const getAllEmployeeList = (params: EmpQueryParams) =>
  api.get("employees", {
    params,
  });
export const createEmployee = (data: EmployeeCreateInput) =>
  api.post("employees", data);
export const updateEmployee = (id: number, data: EmployeeUpdateInput) =>
  api.patch(`employees/${id}`, data);
export const deleteEmployee = (id: number) => api.delete(`employees/${id}`);
export const getExportEmpCSV = () => api.get("employees/export");
