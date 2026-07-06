import type { NextFunction, Request, Response } from "express";
import { getAllAllocations } from "../repositories/asset.allocation.repo.js";
import AppResponse from "../Response/app-response.js";
import {
  returnAssetService,
  getEmployeeAllocationsService,
} from "../services/allocation-service.js";
import type { jwtPayload } from "../types/user-types.js";

export const getAllocationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const getAll = await getAllAllocations({ page, limit });
    AppResponse.GET_ALL_ALLOCATIONS.send(res, getAll);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeAllocationsController = async (
  req: Request & { user?: jwtPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    const employeeId = Number(req.user?.userId);
    const allocations = await getEmployeeAllocationsService(employeeId);
    AppResponse.GET_ALL_ALLOCATIONS.send(res, {
      allocations: {
        data: allocations,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const assetReturnController = async (
  req: Request & { user?: jwtPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    if (!id || Number.isNaN(id)) {
      throw AppError.INVALID_ID;
    }
    const userId = Number(req.user?.userId);
    const returnAsset = await returnAssetService(userId, id);
    AppResponse.UPDATED_ITEM.send(res, returnAsset);
  } catch (error) {
    next(error);
  }
};
