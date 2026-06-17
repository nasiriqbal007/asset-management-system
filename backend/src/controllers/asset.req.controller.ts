import type { Request, Response, NextFunction } from "express";
import {
  createAssetReqService,
  getAllAssetReqService,
  getAssetReqByIdService,
  getAssetReqByStatusService,
  approveRequestService,
  rejectRequestService,
} from "../services/asset-req-service.js";
import AppResponse from "../Response/app-response.js";
import type { ReqStatus } from "../types/asset-req-type.js";
import AppError from "../Error/app-error.js";

export const getAllReqController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqs = await getAllAssetReqService();
    AppResponse.GET_ALL_Assets.send(res, reqs);
  } catch (error) {
    next(error);
  }
};

export const getReqByStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const status = req.params.status as ReqStatus;

    if (!status) {
      throw AppError.NOT_FOUND;
    }

    const reqStatus = await getAssetReqByStatusService(status);

    AppResponse.GET_ALL_Assets.send(res, reqStatus);
  } catch (error) {
    next(error);
  }
};
export const getReqByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqId = Number(req.params.id);
    const reqData = await getAssetReqByIdService(reqId);

    AppResponse.Item_BY_ID.send(res, reqData);
    console.log(reqData);
  } catch (error) {
    next(error);
  }
};

export const ApproveReqController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqId = Number(req.params.id);
    const updateData = req.body;
    const updatedReq = await approveRequestService(reqId, updateData);
    AppResponse.UPDATED_ITEM.send(res, updatedReq);
  } catch (error) {
    next(error);
  }
};
export const createReqController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newReq = await createAssetReqService(req.body);
    AppResponse.ITEM_CREATED.send(res, newReq);
  } catch (error) {
    next(error);
  }
};
export const rejectReqController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqId = Number(req.params.id);
    const rejected = await rejectRequestService(reqId);
    AppResponse.UPDATED_ITEM.send(res, rejected);
    if (!reqId) {
      throw AppError.NOT_FOUND;
    }
  } catch (error) {
    next(error);
  }
};
export const approveReqController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqId = Number(req.params.id);
    const allocationData = req.body;

    if (!reqId) {
      throw AppError.NOT_FOUND;
    }

    const allocation = await approveRequestService(reqId, allocationData);
    AppResponse.ITEM_CREATED.send(res, allocation);
  } catch (error) {
    next(error);
  }
};
