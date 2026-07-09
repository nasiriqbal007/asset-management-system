/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import type {
  Employee,
  EmployeeCreateInput,
  EmployeeUpdateInput,
} from "../types/employee";
import { DropDown } from "./DropDown";

import { useEffect } from "react";
import { useDepartments } from "../hooks/useDepartment";

type ModalProps = {
  employee?: Employee | null;
  onClose: () => void;
  isLoading?: boolean;
  onSubmit: (
    data: EmployeeCreateInput | Omit<EmployeeUpdateInput, "id">,
  ) => void;
};

export const EmployeeModal = ({
  employee,
  onClose,
  onSubmit,
  isLoading,
}: ModalProps) => {
  const { departments } = useDepartments();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeCreateInput | EmployeeUpdateInput>();
  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        email: employee.email,
        department_id: Number(employee.department_id),
      });
    }
  }, [departments, employee, reset]);
  const handleFormSubmit = (
    data: EmployeeCreateInput | Omit<EmployeeUpdateInput, "id">,
  ) => {
    const {
      id,
 ...cleanData
    } = data as EmployeeUpdateInput;
    if (employee && !cleanData.password) {
      delete cleanData.password;
    }
    onSubmit(cleanData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-(--bg-card) p-6 rounded-lg w-full max-w-md max-h-[85vh] overflow-y-auto flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {employee ? "Edit Employee" : "Add Employee"}
          </h2>
          <button
            className="text-3xl  hover:cursor-pointer hover:text-(--text-primary) hover:rotate-180 duration-500 transition-all"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-3"
        >
          <Input
            label="Name"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message}
          />
          <DropDown
            label="Department"
            options={
              departments?.map((dep) => ({
                value: Number(dep.id),
                label: dep.department_name,
              })) ?? []
            }
            error={errors.department_id?.message}
            {...register("department_id", {
              required: "Department is required",

              valueAsNumber: true,
            })}
          />
          <Input
            label="Password"
            type="password"
            {...register("password", {
              required: employee ? false : "Password is required",
            })}
            error={errors.password?.message}
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="secondary-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="primary-button"
            >
              {isLoading ? "Saving..." : employee ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
