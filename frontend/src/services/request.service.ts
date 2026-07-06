import api from "../api/api";
import type { Pagination } from "../types/pagination";
import type { CreateAssetRequestInput } from "../types/request";

export const getAllRequests = (params?: Partial<Pagination>) =>
  api.get("/requests", { params });

export const createRequest = (data: CreateAssetRequestInput) =>
  api.post("/requests", data);

export const approveRequest = (id: number) =>
  api.patch(`/requests/${id}/approve`);

export const rejectRequest = (id: number) =>
  api.patch(`/requests/${id}/reject`);
export const getReqByStatus = (status: string, params?: Partial<Pagination>) =>
  api.get(`/requests/status/${status}`, { params });
