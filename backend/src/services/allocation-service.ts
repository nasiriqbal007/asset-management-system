import AppError from "../Error/app-error.js";
import {
  assetReturnDate,
  createAllocation,
  getAllAllocations,
} from "../repositories/asset.allocation.repo.js";
import type {
  AssetAllocation,
  createAllocationInput,
} from "../types/allocation.js";

export const createAllocationService = async (
  data: createAllocationInput,
): Promise<AssetAllocation | null> => {
  const newAllocation = await createAllocation(data);
  if (!newAllocation) {
    throw AppError.VALIDATION_ERROR;
  }
  return newAllocation;
};

export const returnAssetService = async (
  id: number,
): Promise<AssetAllocation | null> => {
  const updatedAllocation = await assetReturnDate(id);
  if (!updatedAllocation) {
    throw AppError.NOT_FOUND;
  }
  return updatedAllocation;
};

export const getAllAllocationsService = async (): Promise<
  AssetAllocation[]
> => {
  const getAll = await getAllAllocations();
  return getAll;
};
