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
            className="flex items-start gap-3 pb-4 border-b border-(--border) last:border-b-0"
          >
            <div className={`${activity.bgColor} p-2 rounded-lg shrink-0`}>
              <activity.icon className={activity.iconColor} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-(--text-primary) text-sm">
                {activity.title}
              </p>
              <p className="text-xs text-(--text-secondary)">{activity.desc}</p>
            </div>
            <span className="text-xs text-(--text-secondary) shrink-0">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
