import AppError from "../Error/app-error.js";
import {
  getTotalAllocations,
  getTotalAssets,
  getTotalAvailableAssets,
  getTotalPendingReq,
  totalEmployees,
} from "../repositories/admin.dashboard.js";

export const TotalEmpService = async () => {
  const total = await totalEmployees();
  if (total === null || total === undefined) {
    throw AppError.NOT_FOUND;
  }
  return total;
};
export const totalAssetService = async () => {
  const total = await getTotalAssets();
  if (!total) {
    throw AppError.ASSET_NOT_FOUND;
  }
  return total;
};

export const totalAllocatedService = async () => {
  const total = await getTotalAllocations();
  if (total === null || total === undefined) {
    throw AppError.NOT_FOUND;
  }
  return total;
};

export const totalAvailableAssetsService = async () => {
  const total = await getTotalAvailableAssets();
  if (total === null || total === undefined) {
    throw AppError.NOT_FOUND;
  }
  return total;
};
export const totalPendingReqService = async () => {
  const total = await getTotalPendingReq();
  if (total === null || total === undefined) {
    throw AppError.NOT_FOUND;
  }
  return total;
};
