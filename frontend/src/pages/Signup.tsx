import { type SubmitHandler } from "react-hook-form";
import { Input } from "../components/Input";
import { DropDown } from "../components/DropDown";
import { useFetchAllDep, useSignUp } from "../hooks/useAuth";

type FormInput = {
  name: string;
  email: string;
  password: string;
  role: "admin";
  departmentId: number;
};

type Department = {
  id: number;

  department_name: string;
};

export const SignUp = () => {
  const { departments } = useFetchAllDep();
  console.log("Departments in SignUp component:", departments);
  const { register, handleSubmit, errors, onSignUp, isLoading } = useSignUp();
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    onSignUp(data);
    console.log("Form Data:", data);
  };

  return (
    <div className="flex justify-center items-center bg-(--primary-light) p-6 h-screen">
      <div className="flex flex-col gap-4 w-full max-w-md p-6 rounded-lg bg-(--bg-card) shadow-md">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-2xl font-bold text-(--text-primary)">SignUp</h1>
          <p className="text-(--text-secondary)">
            Please enter your details to create an account.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Input
            label="Name"
            type="text"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
            })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
          <DropDown
            label="Role"
            options={[{ value: "admin", label: "Admin" }]}
            error={errors.role?.message}
            {...register("role", { required: "Role is required" })}
          />
          <DropDown
            label="Department"
            options={
              departments?.map((dep: Department) => ({
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
          <button type="submit" className=" primary-button">
            {isLoading ? "Signing up..." : "  Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};
