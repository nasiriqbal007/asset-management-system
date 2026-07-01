import api from "../api/api";
import type { CreateAssetRequestInput } from "../types/request";

export const getAllRequests = () => api.get("/requests");

export const createRequest = (data: CreateAssetRequestInput) =>
  api.post("/requests", data);

export const approveRequest = (id: number) =>
  api.patch(`/requests/${id}/approve`);

export const rejectRequest = (id: number) =>
  api.patch(`/requests/${id}/reject`);
export const getReqByStatus = (status: string) =>
  api.get(`/requests/status/${status}`);
