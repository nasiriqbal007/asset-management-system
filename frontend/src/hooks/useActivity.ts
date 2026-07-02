import { useEffect, useState } from "react";
import type { LogEntry } from "../types/log";
import { getActivityLogs } from "../services/activity.service";
import { handleError } from "../utils/handleError";

export const useActivity = () => {
  const [activityLogs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await getActivityLogs();
        setLogs(res.data.payload);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);
  return { activityLogs, loading };
};
