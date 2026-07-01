import api from "../api/api";

export const getActivityLogs = () => api.get("/activity-logs");
