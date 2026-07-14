import { useEffect, useState } from "react";
import {
  getAllAssets,
  getAllEmployees,
  getAllAllocated,
  getAllPending,
  getAssetStatusSummary,
  getAvailableAssets,
  getTopCategories,
} from "../services/dashboard.service";
import type { DashboardStats } from "../types/dashboard";
import { handleError } from "../utils/handleError";

const initialStats: DashboardStats = {
  totalEmployees: 0,
  totalAssets: 0,
  totalAllocated: 0,
  totalPending: 0,
  totalAvailableAssets: 0,
  statusSummary: [],
  topCategories: [],
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
          statusSummaryRes,
          categoryTopRes,
        ] = await Promise.all([
          getAllEmployees(),
          getAllAssets(),
          getAllAllocated(),
          getAllPending(),
          getAvailableAssets(),
          getAssetStatusSummary(),
          getTopCategories(),
        ]);

        const summary = statusSummaryRes?.data?.payload?.summary;

        setStats({
          totalEmployees: employeesRes.data.payload.Employee,
          totalAssets: assetsRes.data.payload.Assets,
          totalAllocated: allocatedRes.data.payload.Allocated,
          totalPending: pendingRes.data.payload.Pending,
          totalAvailableAssets: availableRes.data.payload.Available,
          statusSummary: [
            {
              name: "Available",
              value: Number(
                summary?.Available ?? availableRes.data.payload.Available ?? 0,
              ),
            },
            {
              name: "Allocated",
              value: Number(
                summary?.Allocated ?? allocatedRes.data.payload.Allocated ?? 0,
              ),
            },
            {
              name: "Pending",
              value: Number(
                summary?.Pending ?? pendingRes.data.payload.Pending ?? 0,
              ),
            },
            {
              name: "Maintenance",
              value: Number(summary?.Maintenance ?? 0),
            },
          ],
          topCategories: categoryTopRes?.data?.payload?.categories ?? [],
        });
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
