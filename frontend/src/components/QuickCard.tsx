import { type LucideIcon } from "lucide-react";
import type React from "react";

type QuickActionCardProps = {
  title: string;
  titleColor: string;
  desc: string;
  icon: LucideIcon;
  iconBgColor: string;
  bgColor: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
export const QuickActionCard = ({
  title,
  titleColor,
  desc,
  icon: Icon,
  iconBgColor,
  bgColor,
  onClick,
}: QuickActionCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex gap-3 items-center p-4 ${bgColor} rounded-xl items-center justify-center hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out`}
    >
      <div
        className={`p-4 ${iconBgColor} rounded-xl  items-center justify-center`}
      >
        <Icon className="text-white items-center justify-center" size={20} />
      </div>
      <div className="flex flex-col items-start justify-center">
        <h4 className={`text-md font-semibold ${titleColor} `}>{title}</h4>
        <p className="text-sm text-(--text-secondary) ">{desc}</p>
      </div>
    </div>
  );
};
