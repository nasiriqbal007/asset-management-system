import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

type Option = {
  value: string | number;
  label: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  error?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const DropDown = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-(--text-primary)">{label}</label>
      <select ref={ref} className="input-field " {...props}>
        <option value="">Select...</option>
        {options.map((opt) => (
          <option
            className="text-sm text-(--primary-text) "
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-(--status-danger-text)">{error}</span>
      )}
    </div>
  ),
);

DropDown.displayName = "DropDown";
