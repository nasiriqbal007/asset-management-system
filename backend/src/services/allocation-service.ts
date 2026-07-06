import AppError from "../Error/app-error.js";
import {
  assetReturnDate,
  createAllocation,
  getAllAllocations,
  getEmployeeAllocations,
} from "../repositories/asset.allocation.repo.js";
import type {
  AssetAllocation,
  createAllocationInput,
} from "../types/allocation.js";

export const createAllocationService = async (
  userId: number,
  data: createAllocationInput,
): Promise<AssetAllocation | null> => {
  const newAllocation = await createAllocation(userId, data);
  if (!newAllocation) {
    throw AppError.VALIDATION_ERROR;
  }
  return newAllocation;
};

export const returnAssetService = async (
  userId: number,
  id: number,
): Promise<AssetAllocation | null> => {
  const updatedAllocation = await assetReturnDate(id, userId);
  if (!updatedAllocation) {
    throw AppError.ALLOCATION_NOT_FOUND;
  }
  return updatedAllocation;
};

import type { PaginatedResult } from "../types/pagination.js";

export const getAllAllocationsService = async (
  query: { page?: number; limit?: number } = {},
): Promise<PaginatedResult<AssetAllocation>> => {
  const getAll = await getAllAllocations(query);
  return getAll;
};

export const getEmployeeAllocationsService = async (
  employeeId: number,
): Promise<AssetAllocation[]> => {
  const getAll = await getEmployeeAllocations(employeeId);
  return getAll;
};
