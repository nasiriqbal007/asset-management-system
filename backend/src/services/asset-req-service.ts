import AppError from "../Error/app-error.js";
import {
  checkDuplicatePendingRequest,
  createAssetReq,
  getAllAssetReq,
  getAssetReqById,
  getRequestsByStatus,
  updateAssetReq,
} from "../repositories/asset.req.repo.js";
import type {
  AssetRequest,
  CreateAssetRequestInput,
  ReqStatus,
  UpdateAssetRequestInput,
} from "../types/asset-req-type.js";
import { getAssetById } from "./asset-service.js";

export const createAssetReqService = async (
  data: CreateAssetRequestInput,
): Promise<AssetRequest> => {
  const asset = await getAssetById(data.asset_id);
  if (!asset) {
    throw AppError.ASSET_NOT_FOUND;
  }
  const hasDuplicate = await checkDuplicatePendingRequest(
    data.employee_id,
    data.asset_id,
  );
  if (hasDuplicate) {
    throw AppError.DUPLICATE_REQ_FOUND;
  }
  const newReq = await createAssetReq(data);

  return newReq;
};

export const getAssetReqByIdService = async (
  reqId: number,
): Promise<AssetRequest | undefined> => {
  const req = await getAssetReqById(reqId);
  if (!req?.id) {
    throw AppError.NOT_FOUND;
  }
  return req;
};
export const getAllAssetReqService = async (): Promise<AssetRequest[]> => {
  const reqs = await getAllAssetReq();
  if (reqs.length === 0 || !reqs) {
    throw AppError.NOT_FOUND;
  }
  return reqs;
};

export const getAssetReqByStatusService = async (
  status: ReqStatus,
): Promise<AssetRequest[]> => {

  const reqStatus = await getRequestsByStatus(status);
  

  if (reqStatus.length === 0 || !reqStatus) {
    throw AppError.NOT_FOUND;
  }
  return reqStatus;
};

export const updateAssetReqService = async (
  reqId: number,
  data: UpdateAssetRequestInput,
): Promise<AssetRequest | undefined> => {
  if (!reqId) {
    AppError.NOT_FOUND;
  }
  const updateReq = await updateAssetReq(reqId, data);
  return updateReq;
};
