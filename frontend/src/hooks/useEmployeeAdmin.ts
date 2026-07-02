import { useEffect, useState } from "react";

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

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchEmp, setSearchEmp] = useState("");
  const [deptId, setDeptId] = useState<number | "">("");
  const [debouncedSearchEmp, setDebouncedSearchEmp] = useState(searchEmp);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchEmp(searchEmp);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchEmp]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const res = await getAllEmployeeList({
          name: debouncedSearchEmp || undefined,
          department_id: deptId === "" ? undefined : deptId,
        });

        setEmployees(res.data.payload.data);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, [debouncedSearchEmp, deptId]);

  const createEmp = async (data: EmployeeCreateInput) => {
    setIsLoading(true);
    try {
      const res = await createEmployee(data);
      console.log(res);
      const newEmployee = res.data.payload;
      console.log(newEmployee);
      setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateEmp = async (data: EmployeeUpdateInput) => {
    setIsLoading(true);
    try {
      const res = await updateEmployee(data);
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === res.data.payload.id ? res.data.payload : emp,
        ),
      );
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
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.id !== res.data.payload.id),
      );
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
  };
};
