import AppError from "../Error/app-error.js";
import {
  createAsset,
  deleteAsset,
  assetById,
  getAssets,
  updateAsset,
  checkSerialNumberExists,
} from "../repositories/asset.repo.js";
import type {
  AssetQuery,
  CreateAssetInput,
  UpdateAsset,
} from "../types/asset-type.js";

export const AddAsset = async (userId: number, data: CreateAssetInput) => {
  const serialExists = await checkSerialNumberExists(data.serial_number);
  if (serialExists) {
    throw AppError.ASSET_ALREADY_EXISTS;
  }
  const newAsset = await createAsset(userId, data);

  return newAsset;
};
export const updatedAsset = async (
  assetId: number,
  userId: number,
  data: UpdateAsset,
) => {
  const newAsset = await updateAsset(assetId, userId, data);
  if (!newAsset) {
    throw AppError.ASSET_NOT_FOUND;
  }

  return newAsset;
};
export const getAllAsset = async (assetQuery: AssetQuery) => {
  const assets = await getAssets(assetQuery);

  if (assets.data.length === 0 || !assets) {
    throw AppError.NOT_FOUND;
  }

  return assets;
};
export const getAssetById = async (assetId: number) => {
  const asset = await assetById(assetId);
  if (!asset) {
    throw AppError.ASSET_NOT_FOUND;
  }
  return asset;
};
export const deleteAssetId = async (assetId: number, userId: number) => {
  const asset = await deleteAsset(assetId, userId);
  if (!asset) {
    throw AppError.ASSET_NOT_FOUND;
  }
  return asset;
};
