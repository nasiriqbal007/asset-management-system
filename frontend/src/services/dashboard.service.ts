import api from "../api/api";

export const getAllEmployees = () => api.get(`/admin/total-employees`);
export const getAllAssets = () => api.get(`/admin/total-assets`);
export const getAllPending = () => api.get(`/admin/total-pending`);
export const getAllAllocated = () => api.get(`/admin/total-allocated`);
export const getAvailableAssets = () => api.get(`/admin/total-available`);
export const getAssetStatusSummary = () => api.get(`/admin/status-summary`);
