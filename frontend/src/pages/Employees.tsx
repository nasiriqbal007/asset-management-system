import { useState } from "react";
import { Table } from "../components/Table";
import { useEmployees } from "../hooks/useEmp";
import type {
  Employee,
  EmployeeCreateInput,
  EmployeeUpdateInput,
} from "../types/employee";
import { EmployeeModal } from "../components/EmployeModel";

export const Employees = () => {
  const [isModelOpen, setOpenModel] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const { employees, isLoading, createEmp, updateEmp, deleteEmp } =
    useEmployees();
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" },
    { key: "role", label: "Role" },
    { key: "created_at", label: "Created At" },
  ];
  const actions = [
    {
      label: "Edit",
      onClick: (row: Employee) => {
        setEmployeeToEdit(row);
        setOpenModel(true);
      },
    },

    {
      label: "delete",
      onClick: (row: Employee) => {
        deleteEmp(row.id);
      },
    },
  ];

  const handleSubmit = (data: EmployeeCreateInput | EmployeeUpdateInput) => {
    if (employeeToEdit) {
      return updateEmp(data as EmployeeUpdateInput);
    }

    return createEmp(data as EmployeeCreateInput);
  };

  return (
    <div className="px-2 bg-(--bg-page)">
      {isLoading && (
        <p className="flex items-center justify-center">Loading...</p>
      )}
      <div className="flex justify-end">
        <button
          className="primary-button mb-4"
          onClick={() => setOpenModel(true)}
        >
          Add Employee
        </button>
      </div>

      <Table columns={columns} data={employees} actions={actions} />
      {isModelOpen && (
        <EmployeeModal
          employee={employeeToEdit}
          onClose={() => {
            setOpenModel(false);
            setEmployeeToEdit(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
