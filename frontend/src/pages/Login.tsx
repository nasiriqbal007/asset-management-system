import { type SubmitHandler } from "react-hook-form";
import { Input } from "../components/Input";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router";

type FormInput = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors, onLogin, isLoading } = useLogin();
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const res = await onLogin(data);
      console.log("Login response:", res);
      if (res) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.user.role);
        console.log("Login successful:", res.user.role);
        if (res.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/employee");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="flex justify-center items-center bg-(--primary-light) p-6 h-screen">
      <div className="flex flex-col gap-4 w-full max-w-md p-6 rounded-lg bg-(--bg-card) shadow-md">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-2xl font-bold text-(--text-primary)">Login</h1>
          <p className="text-(--text-secondary)">
            Please enter your email and password to login.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
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

          <button type="submit" className=" primary-button">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
