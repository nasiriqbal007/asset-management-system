import type { NextFunction, Request, Response } from "express";
import { getAllAllocations } from "../repositories/asset.allocation.repo.js";
import AppResponse from "../Response/app-response.js";
import { returnAssetService } from "../services/allocation-service.js";
export const getAllocationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getAll = await getAllAllocations();
    AppResponse.GET_ALL_Assets.send(res, getAll);
  } catch (error) {
    next(error);
  }
};
export const assetReturnController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.params.userId);
    const returnAsset = await returnAssetService(userId, id);
    AppResponse.UPDATED_ITEM.send(res, returnAsset);
  } catch (error) {
    next(error);
  }
};
