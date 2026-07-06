import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

type Option = {
  value: string | number;
  label: string;
};

type SelectProps = {
  label: string;
  layout?: "horizontal" | "vertical";
  options: Option[];
  error?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const DropDown = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, layout = "vertical", options, error, ...props }, ref) => {
    const isHorizontal = layout === "horizontal";

    return (
      <div className={isHorizontal ? "flex items-center gap-2" : "flex flex-col gap-1"}>
        <label className="text-sm font-medium text-(--text-primary) whitespace-nowrap">
          {label}
        </label>
        <div className="flex flex-col w-full">
          <select
            ref={ref}
            className="rounded-sm border border-(--border) bg-(--primary-light) text-sm focus:outline-0 py-2 pr-8 pl-3 w-full focus:ring-2 focus:ring-(--primary) focus:ring-offset-1 cursor-pointer"
            {...props}
          >
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
            <span className="text-xs text-(--status-danger-text) mt-1">{error}</span>
          )}
        </div>
      </div>
    );
  },
);

DropDown.displayName = "DropDown";
