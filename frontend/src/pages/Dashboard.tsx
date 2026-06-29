import {
  ClipboardCheckIcon,
  Layers,
  Package,
  Users,
  CheckCircle,
} from "lucide-react";
import { StatCard } from "../components/StatCard";
import { useDashboardStats } from "../hooks/useDashboard";

export const Dashboard = () => {
  const { isLoading, stats } = useDashboardStats();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center items-center">
      <StatCard
        label="Total Employees"
        value={stats.totalEmployees}
        icon={Users}
      />
      <StatCard label="Total Assets" value={stats.totalAssets} icon={Package} />
      <StatCard
        label="Total Pending"
        value={stats.totalPending}
        icon={ClipboardCheckIcon}
      />
      <StatCard
        label="Total Allocated"
        value={stats.totalAllocated}
        icon={Layers}
      />
      <StatCard
        label="Available Assets"
        value={stats.totalAvailableAssets}
        icon={CheckCircle}
      />
    </div>
  );
};
