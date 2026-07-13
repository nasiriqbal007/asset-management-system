import { MoreVertical, type LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  trend: string;
  trendLabel?: string;
};

export const StatCard = ({
  label,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
  trend,
  trendLabel = "from last month",
}: StatCardProps) => {
  return (
    <div className="bg-(--bg-card) p-5 rounded-2xl border border-(--border) shadow-xs flex flex-col justify-between w-full relative overflow-hidden group hover:shadow-sm transition-all duration-200 cursor-pointer">
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-row items-center gap-3">
          {Icon && (
            <div
              className={`p-3 rounded-xl flex items-center justify-center ${iconBgColor} hover:`}
            >
              <Icon className={iconColor} size={22} />
            </div>
          )}

          <div className="flex flex-col text-left">
            <span className="text-xs font-medium text-(--text-secondary) tracking-wide">
              {label}
            </span>
            <span className="text-2xl font-bold text-(--text-primary) mt-0.5">
              {value}
            </span>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600 p-1 transition-colors hover:cursor-pointer">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1.5 mt-4 text-xs font-medium">
        <span className="text-emerald-500 font-bold">{trend}</span>
        <span className="text-gray-400">{trendLabel}</span>
      </div>
    </div>
  );
};
