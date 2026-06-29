import { useEffect, useState } from "react";

import {
  getAllEmployeeList,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employe.service";
import type {
  Employee,
  EmployeeCreateInput,
  EmployeeUpdateInput,
} from "../types/employee";

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const res = await getAllEmployeeList();
        setEmployees(res.data.payload.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const createEmp = async (data: EmployeeCreateInput) => {
    setIsLoading(true);
    try {
      const res = await createEmployee(data);
      setEmployees((prevEmployees) => [
        ...prevEmployees,
        res.data.payload.data,
      ]);
    } catch (error) {
      console.error("Error creating employee:", error);
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
          emp.id === res.data.payload.data.id ? res.data.payload.data : emp,
        ),
      );
    } catch (error) {
      console.error("Error updating employee:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEmp = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await deleteEmployee(id);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.id !== res.data.payload.data.id),
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
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
  };
};
