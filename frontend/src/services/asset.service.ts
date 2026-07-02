import api from "../api/api";
import type {
  AssetCreateInput,
  AssetQueryParams,
  AssetUpdateInput,
} from "../types/asset";

export const getAllAssetList = (params: AssetQueryParams) =>
  api.get("assets", {
    params,
  });
export const createNewAsset = (data: AssetCreateInput) =>
  api.post("/assets", data);
export const updateCurrentAsset = (data: AssetUpdateInput) =>
  api.patch(`assets/${data.id}`, data);
export const deleteAsset = (id: number) => api.delete(`assets/${id}`);
export const exportAssetsCSV = () => api.get("assets/export");
