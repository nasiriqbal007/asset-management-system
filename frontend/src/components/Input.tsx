import type { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text(--text-primary) text-md " htmlFor={label}>
        {label}
      </label>
      <input className="input-field" {...props} />
      {error && (
        <span className="error-message">{error}</span>
      )}
    </div>
  );
};
