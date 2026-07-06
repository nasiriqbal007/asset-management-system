import api from "../api/api";
import type { Pagination } from "../types/pagination";

export const getActivityLogs = (params?: Partial<Pagination>) => api.get("/activity-logs",{params});
