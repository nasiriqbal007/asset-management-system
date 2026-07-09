import { useState, useMemo } from "react";
import { Table } from "../components/Table";
import { useEmployees } from "../hooks/useEmployeeAdmin";
import type {
  Employee,
  EmployeeCreateInput,
  EmployeeUpdateInput,
} from "../types/employee";
import { EmployeeModal } from "../components/EmployeeModal";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { SearchInput } from "../components/SearchInput";

import { DropDown } from "../components/DropDown";
import { FileDown } from "lucide-react";
import { useDepartments } from "../hooks/useDepartment";

export const Employees = () => {
  const [isModelOpen, setOpenModel] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const {
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
    setPage,
  } = useEmployees();
  const { departments } = useDepartments();

  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "department", label: "Department" },
      { key: "role", label: "Role" },
      { key: "created_at", label: "Created At" },
    ],
    [],
  );

  const actions = useMemo(
    () => [
      {
        label: "Edit",
        onClick: (row: Employee) => {
          setEmployeeToEdit(row);
          console.log(row);
          setOpenModel(true);
        },
      },
      {
        label: "delete",
        onClick: (row: Employee) => {
          deleteEmp(row.id);
        },
      },
    ],
    [deleteEmp],
  );

  const handleSubmit = async (
    data: EmployeeCreateInput | Omit<EmployeeUpdateInput, "id">,
  ) => {
    if (employeeToEdit) {
      await updateEmp(employeeToEdit.id, data as EmployeeUpdateInput);
      
    } else {
      await createEmp(data as EmployeeCreateInput);
    }
    setOpenModel(false);
  };

  return (
    <div className="px-2 pt-6 bg-(--bg-page)">
      <div className="flex flex-wrap justify-between gap-4 items-center sticky top-0 bg-(--bg-page) z-10 py-2">
        <SearchInput
          placeholder="search employee"
          value={searchEmp}
          onChange={(e) => setSearchEmp(e.target.value)}
        />
        <button
          className="primary-button mb-4"
          onClick={() => {
            setOpenModel(true);
            setEmployeeToEdit(null);
          }}
        >
          Add Employee
        </button>
        <DropDown
          label="Department"
          layout="horizontal"
          value={deptId}
          onChange={(e) =>
            setDeptId(e.target.value ? Number(e.target.value) : "")
          }
          options={
            departments?.map((dep) => ({
              value: dep.id,
              label: dep.department_name,
            })) ?? []
          }
        />
        <button className="primary-button mb-4" onClick={() => exportEmpData()}>
          <FileDown className="w-5 h-5" />
        </button>
      </div>

      {isLoading && <LoadingSpinner />}
      <Table
        columns={columns}
        data={employees.data}
        actions={actions}
        pagination={employees.pagination}
        onPageChange={setPage}
      />
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
