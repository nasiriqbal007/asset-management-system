/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";

import {
  getAllEmployeeList,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getExportEmpCSV,
} from "../services/employeeAdmin.service";
import type {
  Employee,
  EmployeeCreateInput,
  EmployeeUpdateInput,
} from "../types/employee";
import { handleError } from "../utils/handleError";
import type { PaginatedResponse } from "../types/pagination";
import toast from "react-hot-toast";
import axios from "axios";

export const useEmployees = () => {
  const [employees, setEmployees] = useState<PaginatedResponse<Employee>>({
    data: [],
    pagination: {
      page: 1,
      totalPages: 1,
      limit: 5,
      total: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchEmp, setSearchEmpState] = useState("");
  const [deptId, setDeptIdState] = useState<number | "">("");
  const [debouncedSearchEmp, setDebouncedSearchEmp] = useState(searchEmp);
  const [page, setPage] = useState(1);

  const setSearchEmp = (value: string) => {
    setSearchEmpState(value);
    setPage(1);
  };

  const setDeptId = (value: number | "") => {
    setDeptIdState(value);
    setPage(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchEmp(searchEmp);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchEmp]);

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllEmployeeList({
        name: debouncedSearchEmp || undefined,
        department_id: deptId === "" ? undefined : deptId,
        page,
        limit: 5,
      });

      setEmployees(res.data.payload);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setEmployees((prev) => ({
          ...prev,
          data: [],
          pagination: { ...prev.pagination, total: 0, totalPages: 1 },
        }));
      } else {
        handleError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchEmp, deptId, page]);
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const createEmp = async (data: EmployeeCreateInput) => {
    setIsLoading(true);
    try {
      const res = await createEmployee(data);

      const newEmployee = res.data.payload;

      setEmployees((prev) => ({
        ...prev,
        data: [...prev.data, newEmployee],
      }));
      toast.success("Employee created successfully");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateEmp = async (id: number, data: EmployeeUpdateInput) => {
    setIsLoading(true);
    try {
      const res = await updateEmployee(id, data);

      const updatedEmployee = res.data.payload;
      await fetchEmployees();
      setEmployees((prev) => ({
        ...prev,
        data: prev.data.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp,
        ),
      }));

      toast.success("Employee updated successfully");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEmp = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await deleteEmployee(id);
      await fetchEmployees();
      setEmployees((prev) => ({
        ...prev,
        data: prev.data.filter((emp) => emp.id !== res.data.payload.id),
      }));
      toast.success("Employee deleted successfully");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const exportEmpData = async () => {
    setIsLoading(true);
    try {
      const res = await getExportEmpCSV();
      const blob = new Blob([res.data], { type: "text/csv" });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "employees.csv");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Employee data exported successfully");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    employees,
    isLoading,
    createEmp,
    updateEmp,
    deleteEmp,
    searchEmp,
    setSearchEmp,
    deptId,
    setDeptId,
    exportEmpData,
    page,
    setPage,
  };
};
