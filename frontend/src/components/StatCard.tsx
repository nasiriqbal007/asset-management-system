import type { LucideIcon } from "lucide-react";
type StatCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
};

export const StatCard = ({ label, value, icon: Icon }: StatCardProps) => {
  return (
    <div className="bg-(--bg-card) p-4 rounded-lg shadow-md items-center gap-4 flex flex-col cursor-pointer">
      {Icon && <Icon size={40} />}
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold text-(--text-primary) mt-2">
          {label}
        </h2>
        <p className="text-(--text-secondary)">{value}</p>
      </div>
    </div>
  );
};
