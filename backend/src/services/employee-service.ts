import AppError from "../Error/app-error.js";
import {
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from "../repositories/employee.repo.js";
import type { QueryUser, UpdateEmpType } from "../types/user-types.js";

export const getAllEmp = async (query: QueryUser) => {
  const employees = await getAllEmployees(query);
  if (employees.length === 0 || !employees) {
    AppError.NOT_FOUND;
  }
  return employees;
};

export const getEmpById = async (empId: number) => {
  const employee = await getEmployeeById(empId);
  if (!employee) {
    AppError.USER_NOT_FOUND;
  }
  return employee;
};
export const updateEmp = async (empId: number, empData: UpdateEmpType) => {
  const updatedEmpData = await updateEmployee(empId, empData);
  if (!updatedEmpData) {
    throw AppError.USER_NOT_FOUND;
  }
  return updatedEmpData;
};
export const deleteEmp = async (empId: number) => {
  const deletedEmployee = await deleteEmployee(empId);
  if (!deletedEmployee) {
    AppError.USER_NOT_FOUND;
  }
  return deletedEmployee;
};
