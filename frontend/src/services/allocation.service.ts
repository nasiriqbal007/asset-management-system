import api from "../api/api";

export const getAllAllocations = () => api.get("allocations");

export const returnAsset = (id: number) =>
  api.patch(`allocations/${id}/return`);
