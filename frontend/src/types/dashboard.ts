export type DashboardStatusItem = {
  name: string;
  value: number;
};

export type DashboardCategoryItem = {
  name: string;
  count: number;
  percentage: number;
};

export type DashboardStats = {
  totalEmployees: number;
  totalAssets: number;
  totalAllocated: number;
  totalAvailableAssets: number;
  totalPending: number;
  statusSummary: DashboardStatusItem[];
  topCategories: DashboardCategoryItem[];
};
