import type { LucideIcon } from "lucide-react";
import { DropDown } from "./DropDown";

interface CategoryCardProps {
  title: string;
  value: number | string;
  barColor?: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

export const CategoryCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
  bgColor,
  barColor,
}: CategoryCardProps) => {
  const options = [
    { label: "this month", value: "this month" },
    { label: "last month", value: "last month" },
    { label: "last 3 months", value: "last 3 months" },
  ];

  return (
    <div className="bg-(--bg-card) p-4 rounded-2xl border border-(--border) shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-(--text-primary)">
          Top Assets Categories
        </h2>
        <DropDown label={""} options={options} />
      </div>

      <div className="flex items-center gap-3">
        <div className={`${bgColor} p-3 rounded-lg `}>
          <Icon className={`${iconColor}  rounded-lg shrink-0`} size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-(--text-primary)">
              {title}
            </span>
            <span className="text-sm font-bold text-(--text-primary)">
              {value}%
            </span>
          </div>
          <div className="w-full bg-(--border) rounded-full h-2">
            <div
              className={`h-2 rounded-full ${barColor}`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
