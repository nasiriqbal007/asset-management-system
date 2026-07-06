import { useEffect, useState } from "react";
import type { LogEntry } from "../types/log";
import { getActivityLogs } from "../services/activity.service";
import { handleError } from "../utils/handleError";
import type { PaginatedResponse } from "../types/pagination";

export const useActivity = () => {
  const [activityLogs, setLogs] = useState<PaginatedResponse<LogEntry>>({
    data: [],
    pagination: {
      page: 1,
      totalPages: 1,
      limit: 10,
      total: 0,
    },
  });
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await getActivityLogs({
          page,
          limit: activityLogs.pagination.limit,
        });
        setLogs(res.data.payload);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [activityLogs.pagination.limit, page]);
  return { activityLogs, loading, page, setPage };
};
