import api from "../api/api";
import type { Pagination } from "../types/pagination";

export const getAllAllocations = (params: Partial<Pagination>) =>
  api.get("allocations", { params });

export const returnAsset = (id: number) =>
  api.patch(`allocations/${id}/return`);
