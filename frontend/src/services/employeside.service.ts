import api from "../api/api";
import type { CreateAssetRequestInput } from "../types/request";

export const returnAsset = (id: number) =>
  api.patch(`allocations/${id}/return`);

export const getAllAssetForEmp = () => api.get("/assets");
export const reqForAsset = (data: CreateAssetRequestInput) =>
  api.post(`/requests`, data);
