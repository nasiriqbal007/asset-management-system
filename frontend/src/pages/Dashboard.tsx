import {
  Layers,
  Package,
  Users,
  CheckCircle,
  ClipboardList,
  Laptop,
  UserPlus,
  Smartphone,
  Headphones,
  Keyboard,
  Monitor,
  MousePointer,
  BookOpen,
  MoreHorizontal,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { StatCard } from "../components/StatCard";
import { useDashboardStats } from "../hooks/useDashboard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { DropDown } from "../components/DropDown";
import { ActivityCard } from "../components/Activity";
import { CategoryCard } from "../components/CategoryCard";
import { QuickActionCard } from "../components/QuickCard";
import { useNavigate } from "react-router";
import { useActivity } from "../hooks/useActivity";
export const Dashboard = () => {
  const { isLoading, stats } = useDashboardStats();
  const { activityLogs } = useActivity();
  const navigate = useNavigate();
  const topCategories =
    stats.topCategories.length > 0 ? stats.topCategories : [];
  const data =
    stats.statusSummary.length > 0
      ? stats.statusSummary
      : [
          { name: "Available", value: stats.totalAvailableAssets },
          { name: "Allocated", value: stats.totalAllocated },
          { name: "Pending", value: stats.totalPending },
          { name: "Maintenance", value: 0 },
        ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#a855f7"];
  const options = [
    {
      label: "this month",
      value: "this month",
    },
    {
      label: "last month",
      value: "last month",
    },
    {
      label: "last 3 months",
      value: "last 3 months",
    },
  ];

  const iconMap = {
    Laptops: {
      icon: Laptop,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-100",
      barColor: "bg-blue-600",
    },
    Mobiles: {
      icon: Smartphone,
      iconColor: "text-sky-500",
      bgColor: "bg-sky-100",
      barColor: "bg-sky-600",
    },
    Accessories: {
      icon: Headphones,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-100",
      barColor: "bg-emerald-600",
    },
    Peripherals: {
      icon: Keyboard,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-100",
      barColor: "bg-amber-600",
    },
    Keyboard: {
      icon: Keyboard,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-100",
      barColor: "bg-amber-600",
    },
    Laptop: {
      icon: Laptop,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-100",
      barColor: "bg-blue-600",
    },
    Headphones: {
      icon: Headphones,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-100",
      barColor: "bg-emerald-600",
    },
    Monitor: {
      icon: Monitor,
      iconColor: "text-violet-500",
      bgColor: "bg-violet-100",
      barColor: "bg-violet-600",
    },
    Mouse: {
      icon: MousePointer,
      iconColor: "text-slate-500",
      bgColor: "bg-slate-100",
      barColor: "bg-slate-600",
    },
    Notebook: {
      icon: BookOpen,
      iconColor: "text-fuchsia-500",
      bgColor: "bg-fuchsia-100",
      barColor: "bg-fuchsia-600",
    },
    Others: {
      icon: MoreHorizontal,
      iconColor: "text-gray-500",
      bgColor: "bg-gray-100",
      barColor: "bg-gray-400",
    },
  } as const;

  const categoryItems = topCategories.map((category) => {
    const categoryKey = category.name as keyof typeof iconMap;
    const style = iconMap[categoryKey] ?? iconMap.Others;

    return {
      title: category.name,
      percentage: category.percentage,
      count: category.count,
      icon: style.icon,
      iconColor: style.iconColor,
      bgColor: style.bgColor,
      barColor: style.barColor,
    };
  });

  const activityItems = (activityLogs?.data ?? []).slice(0, 5).map((a) => {
    return {
      icon: Package,
      title: a.action,
      desc: a.desc,
      time:
        new Date(a.created_at || "").toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }) || "",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
      iconBgColor: "bg-blue-100",
    };
  });

  return (
    <div className="px-2 pt-6 pb-2 bg-(--bg-page)">
      {isLoading && <LoadingSpinner />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 justify-center items-center">
        <StatCard
          label="Total Employees"
          value={stats.totalEmployees}
          icon={Users}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-50"
          trend="8.3%"
        />
        <StatCard
          label="Total Assets"
          value={stats.totalAssets}
          icon={Package}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
          trend="↗ 12.5%"
        />
        <StatCard
          label="Total Pending"
          value={stats.totalPending}
          icon={ClipboardList}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-50"
          trend="0%"
        />
        <StatCard
          label="Total Allocated"
          value={stats.totalAllocated}
          icon={Layers}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-50"
          trend="↗ 16.7%"
        />
        <StatCard
          label="Available Assets"
          value={stats.totalAvailableAssets}
          icon={CheckCircle}
          iconColor="text-violet-600"
          iconBgColor="bg-violet-50"
          trend="↗ 10.3%"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:3 gap-4 mt-6 bg-(--bg-page)">
        <div className="bg-(--bg-card) p-4 rounded-2xl border border-(--border) shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-(--text-primary)">
              Assets Overview
            </h2>
            <DropDown label={""} options={options} />
          </div>

          <div className="flex flex-col md:flex-row gap-6 ">
            <div className="w-full md:w-1/2 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    label={false}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold"
                    fill="black"
                  >
                    <tspan x="50%">{stats.totalAssets}</tspan>
                    <tspan x="50%" dy="1.2em" fontSize="12" fill="gray">
                      Total Assets
                    </tspan>
                  </text>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-3 justify-center">
              {data.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-(--text-secondary)">
                    {entry.name}
                  </span>
                  <span className="font-semibold text-(--text-primary) ml-auto">
                    {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-(--bd-card) flex justify-center mt-6 border border-(--border) rounded-lg hover:bg-(--primary-light) hover:cursor-pointer transition-all duration-200">
            <button className=" text-center py-2 text-(--text-primary)  rounded-lg transition">
              View Assets
            </button>
          </div>
        </div>

        <ActivityCard activities={activityItems} />
        <CategoryCard
          title="Top Asset Categories"
          items={categoryItems}
          options={options}
        />
      </div>
      <div className="p-6 mt-6 bg-(--bg-card) rounded-2xl border border-(--border) shadow-xs">
        <h2 className="text-lg font-semibold text-(--text-primary) mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <QuickActionCard
            title="Add Employee"
            titleColor="text-(--text-primary)"
            desc="Add a new employee"
            icon={UserPlus}
            iconBgColor="bg-purple-600"
            bgColor="bg-purple-50"
            onClick={() => navigate("/admin/employees")}
          />

          <QuickActionCard
            title="Add Asset"
            titleColor="text-(--text-primary)"
            desc="Register new asset"
            icon={Package}
            iconBgColor="bg-blue-600"
            bgColor="bg-blue-50"
            onClick={() => navigate("/admin/assets")}
          />

          <QuickActionCard
            title="Quick Allocation"
            titleColor="text-(--text-primary)"
            desc="Allocate asset quickly"
            icon={Layers}
            iconBgColor="bg-amber-500"
            bgColor="bg-amber-50"
            onClick={() => navigate("/admin/allocations")}
          />
        </div>
      </div>
    </div>
  );
};
