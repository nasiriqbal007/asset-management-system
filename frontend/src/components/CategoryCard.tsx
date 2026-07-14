import type { LucideIcon } from "lucide-react";
import { DropDown } from "./DropDown";

type CategoryCardItem = {
  title: string;
  percentage: number;
  count: number;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  barColor: string;
};

interface CategoryCardProps {
  title: string;
  items: CategoryCardItem[];
  options?: { label: string; value: string | number }[];
}

export const CategoryCard = ({
  title,
  items,
  options = [],
}: CategoryCardProps) => {
  return (
    <div className="bg-(--bg-card) p-4 rounded-2xl border border-(--border) shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-(--text-primary)">{title}</h2>
        <DropDown label="" options={options} />
      </div>

      <div className="flex flex-col gap-4">
        {items.length === 0 ? (
          <div className="text-sm text-(--text-secondary)">
            No category data available.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.title} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`${item.bgColor} p-3 rounded-lg`}>
                  <item.icon
                    className={`${item.iconColor} rounded-lg`}
                    size={20}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-(--text-primary)">
                      {item.title}
                    </span>
                    <span className="text-sm font-semibold text-(--text-primary)">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-(--border) rounded-full h-2">
                    <div
                      className={`${item.barColor} h-2 rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-(--text-secondary) whitespace-nowrap">
                  {item.count} Assets
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
