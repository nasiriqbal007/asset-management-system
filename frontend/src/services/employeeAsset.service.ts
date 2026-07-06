import api from "../api/api";
import type { CreateAssetRequestInput } from "../types/request";
import type { Pagination } from "../types/pagination";

export const returnAsset = (id: number) =>
  api.patch(`allocations/${id}/return`);

export const getAllAssetForEmp = (params?: Partial<Pagination>) => api.get("/assets", { params });
export const reqForAsset = (data: CreateAssetRequestInput) =>
  api.post(`/requests`, data);

export const getMyAllocations = () => api.get("/allocations/my-allocations");
