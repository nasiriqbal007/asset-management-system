import api from "../api/api";
import type { AssetCreateInput, AssetUpdateInput } from "../types/asset";

export const getAllAssetList = () => api.get("/assets");
export const createNewAsset = (data: AssetCreateInput) =>
  api.post("/assets", data);
export const updateCurrentAsset = (data: AssetUpdateInput) =>
  api.patch(`assets/${data.id}`);
export const deleteAsset = (id: number) => api.delete(`assets/${id}`);
