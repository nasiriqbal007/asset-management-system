import { useForm } from "react-hook-form";
import { Input } from "./Input";
import type {
  Employee,
  EmployeeCreateInput,
  EmployeeUpdateInput,
} from "../types/employee";
import { DropDown } from "./DropDown";
import { useFetchAllDep } from "../hooks/useAuth";

type ModalProps = {
  employee?: Employee | null;
  onClose: () => void;
  onSubmit: (data: EmployeeCreateInput | EmployeeUpdateInput) => void;
};

export const EmployeeModal = ({ employee, onClose, onSubmit }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeCreateInput>({
    defaultValues: employee ?? {},
  });
  const { departments } = useFetchAllDep();
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-(--bg-card) p-6 rounded-lg w-full max-w-md flex flex-col gap-4">
        <h2 className="text-xl font-bold">
          {employee ? "Edit Employee" : "Add Employee"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
                value: dep.id,
                label: dep.department_name,
              })) ?? []
            }
            error={errors.departmentId?.message}
            {...register("departmentId", {
              required: "Department is required",
              valueAsNumber: true,
            })}
          />
          <Input
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
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
            <button type="submit" className="primary-button">
              {employee ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
