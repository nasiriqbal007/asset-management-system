import type { NextFunction, Request, Response } from "express";
import {
  getAssetStatusSummaryService,
  TotalEmpService,
  totalAssetService,
  totalAllocatedService,
  totalAvailableAssetsService,
  totalPendingReqService,
} from "../services/admin-dashboard-service.js";
import AppResponse from "../Response/app-response.js";

export const totalEmpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const total = await TotalEmpService();

    AppResponse.TOTAL_EMP.send(res, {
      Employee: total,
    });
  } catch (error) {
    next(error);
  }
};

export const totalAssetController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const total = await totalAssetService();

    AppResponse.TOTAL_ASSETS.send(res, {
      Assets: total,
    });
  } catch (error) {
    next(error);
  }
};

export const totalAllocatedController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const total = await totalAllocatedService();
    AppResponse.TOTAL_ALLOCATED.send(res, {
      Allocated: total,
    });
  } catch (error) {
    next(error);
  }
};

export const totalAvailableAssetController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const total = await totalAvailableAssetsService();
    AppResponse.TOTAL_AVAILABLE.send(res, { Available: total });
  } catch (error) {
    next(error);
  }
};

export const totalPendingReqController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const total = await totalPendingReqService();
    AppResponse.TOTAL_PENDING.send(res, {
      Pending: total,
    });
  } catch (error) {
    next(error);
  }
};

export const assetStatusSummaryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const summary = await getAssetStatusSummaryService();
    AppResponse.DASHBOARD_STATUS_SUMMARY.send(res, {
      summary,
    });
  } catch (error) {
    next(error);
  }
};
