import { useEffect, useState } from "react";
import {
  getAllAssets,
  getAllEmployees,
  getAllAllocated,
  getAllPending,
  getAvailableAssets,
} from "../services/dashboard.service";
import type { DashboardStats } from "../types/dashboard";
import { handleError } from "../utils/handleError";

const initialStats: DashboardStats = {
  totalEmployees: 0,
  totalAssets: 0,
  totalAllocated: 0,
  totalPending: 0,
  totalAvailableAssets: 0,
};
export const useDashboardStats = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [stats, setStats] = useState<DashboardStats>(initialStats);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const [
          employeesRes,
          assetsRes,
          allocatedRes,
          pendingRes,
          availableRes,
        ] = await Promise.all([
          getAllEmployees(),
          getAllAssets(),
          getAllAllocated(),
          getAllPending(),
          getAvailableAssets(),
        ]);
        setStats({
          totalEmployees: employeesRes.data.payload.Employee,
          totalAssets: assetsRes.data.payload.Assets,

          totalAllocated: allocatedRes.data.payload.Allocated,
          totalPending: pendingRes.data.payload.Pending,
          totalAvailableAssets: availableRes.data.payload.Available,
        });
        console.log(
          "Dashboard stats fetched successfully:",
          availableRes.data.payload.Available,
        );
      } catch (error) {
          handleError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);
  return { stats, isLoading };
};
