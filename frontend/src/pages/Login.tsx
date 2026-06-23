import { useForm, type SubmitHandler } from "react-hook-form";

type FormInput = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
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
          <label className="text(--text-primary) text-md " htmlFor="email">
            Email
          </label>
          <input
            className="input-field"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
          <label htmlFor="password">Password</label>
          <input
            className="input-field"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            type="password"
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
          <button type="submit" className=" primary-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
