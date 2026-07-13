import {
  Layers,
  Package,
  Users,
  CheckCircle,
  ClipboardList,
  User,
  Laptop,
  UserPlus,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { StatCard } from "../components/StatCard";
import { useDashboardStats } from "../hooks/useDashboard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { DropDown } from "../components/DropDown";
import { ActivityCard } from "../components/Activity";
import { CategoryCard } from "../components/CategoryCard";

export const Dashboard = () => {
  const { isLoading, stats } = useDashboardStats();

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
  //for dropdonw months
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:3 gap-4 mt-6">
        <div className="bg-(--bg-card) p-4 rounded-2xl border border-(--border) shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-(--text-primary)">
              Assets Overview
            </h2>
            <DropDown label={""} options={options} />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
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
                    <tspan x="50%">31</tspan>
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

        <ActivityCard
          activities={[
            {
              icon: User,
              title: "New user registered",
              desc: "A new user has registered on the platform.",
              time: "2 hours ago",
              bgColor: "bg-blue-100",
              iconColor: "text-blue-500",
            },
          ]}
        />
        <CategoryCard
          title={"Laptops"}
          value={45}
          icon={Laptop}
          bgColor="bg-blue-100"
          iconColor="text-blue-500"
          barColor={"bg-blue-600"}
        />
      </div>
      <div className="p-6 mt-6 bg-(--bg-card) rounded-2xl border border-(--border) shadow-xs flex flex-row gap-6">
        <div>
          <h2 className="text-lg font-semibold text-(--text-primary) mb-4">
            Quick Actions
          </h2>
          <div>
            <div className=" flex gap-4 item-center p-4 bg-purple-200 rounded-2xl ">
              <div className="p-6 bg-purple-600 rounded-xl  items-center justify-center">
                <UserPlus className="text-white" size={24} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-(--text-primary) mt-4">
                  Add Employee
                </h4>
                <p className="text-sm text-(--text-secondary) mt-2">
                  add new employee
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-(--text-primary) mb-4">
            Quick Actions
          </h2>
          <div>
            <div className=" flex gap-4 item-center p-4 bg-purple-200 rounded-2xl ">
              <div className="p-6 bg-purple-600 rounded-xl  items-center justify-center">
                <UserPlus className="text-white" size={24} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-(--text-primary) mt-4">
                  Add Employee
                </h4>
                <p className="text-sm text-(--text-secondary) mt-2">
                  add new employee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
