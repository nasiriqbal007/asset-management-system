import type { LucideIcon } from "lucide-react";
interface Activity {
  icon: LucideIcon;
  title: string;
  desc: string;
  time: string;
  bgColor: string;
  iconColor: string;
}

interface ActivityCardProps {
  activities: Activity[];
}

export const ActivityCard = ({ activities }: ActivityCardProps) => {
  return (
    <div className="bg-(--bg-card) p-4 rounded-2xl border border-(--border) shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-(--text-primary)">
          Recent Activity
        </h2>
        <button className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-3 py-3 border-b border-(--border) last:border-b-0"
          >
            <div
              className={`${activity.bgColor} w-10 h-10 flex items-center justify-center rounded-full shrink-0`}
            >
              <activity.icon className={`${activity.iconColor}`} size={18} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-(--text-primary) text-sm truncate">
                {activity.title}
              </p>
              <p className="text-xs text-(--text-secondary) mt-1 truncate">
                {activity.desc}
              </p>
            </div>

            <span className="text-xs text-(--text-secondary) shrink-0 ml-4">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
