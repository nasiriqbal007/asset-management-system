import { pool } from "../db/pool.js";
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
  AssetAllocation,
  createAllocationInput,
} from "../types/allocation.js";
import type {
  AssetRequest,
  CreateAssetRequestInput,
  ReqStatus,
} from "../types/asset-req-type.js";
import { getAssetById } from "./asset-service.js";
import { createAllocationService } from "./allocation-service.js";
import { assetById } from "../repositories/asset.repo.js";
import { checkAvailability } from "../repositories/asset.allocation.repo.js";

export const createAssetReqService = async (
  data: CreateAssetRequestInput,
): Promise<AssetRequest> => {
  const asset = await getAssetById(data.asset_id);
  if (!asset) {
    throw AppError.ASSET_NOT_FOUND;
  }
  const isAvailable = await checkAvailability(data.asset_id);
  console.log("......is available  " + isAvailable);
  if (!isAvailable) {
    throw AppError.ALREADY_IN_USE;
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
    throw AppError.REQUEST_NOT_FOUND;
  }
  return req;
};
import type { PaginatedResult } from "../types/pagination.js";

export const getAllAssetReqService = async (
  query: { page?: number; limit?: number } = {},
): Promise<PaginatedResult<AssetRequest>> => {
  const reqs = await getAllAssetReq(query);
  if (!reqs || reqs.data.length === 0) {
    throw AppError.REQUEST_NOT_FOUND;
  }
  return reqs;
};

export const getAssetReqByStatusService = async (
  status: ReqStatus,
  query: { page?: number; limit?: number } = {},
): Promise<PaginatedResult<AssetRequest>> => {
  const reqStatus = await getRequestsByStatus(status, query);

  if (!reqStatus || reqStatus.data.length === 0) {
    throw AppError.REQUEST_NOT_FOUND;
  }
  return reqStatus;
};

export const rejectRequestService = async (reqId: number, userId: number) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const req = await getAssetReqById(reqId);
    if (!req) {
      throw AppError.REQUEST_NOT_FOUND;
    }

    if (req.status !== "pending") {
      throw AppError.VALIDATION_ERROR;
    }
    const updateReq = await updateAssetReq(client, reqId, {
      status: "rejected",
    });
    if (!updateReq) {
      throw AppError.VALIDATION_ERROR;
    }
    await client.query(
      "INSERT INTO activity_logs (user_id, action, entity_type,entity_id) VALUES ($1,$2,$3,$4)",
      [userId, "rejected", "Asset Request", reqId],
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
export const approveRequestService = async (
  reqId: number,
  userId: number,
  data?: Partial<createAllocationInput>,
): Promise<AssetAllocation> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const req = await getAssetReqById(reqId);
    if (!req) {
      throw AppError.REQUEST_NOT_FOUND;
    }

    if (req.status !== "pending") {
      throw AppError.VALIDATION_ERROR;
    }

    const updatedReq = await updateAssetReq(client, reqId, {
      status: "approved",
    });
    if (!updatedReq) {
      throw AppError.REQUEST_NOT_FOUND;
    }

    const allocation = await createAllocationService(userId, {
      asset_id: data?.asset_id || updatedReq.asset_id,
      employee_id: data?.employee_id || updatedReq.employee_id,
    });
    if (!allocation) {
      throw AppError.VALIDATION_ERROR;
    }
    await client.query(
      "INSERT INTO activity_logs (user_id,action,entity_type, entity_id) VALUES($1,$2,$3,$4)",
      [userId, "Approved", "Asset Request", reqId],
    );
    await client.query("COMMIT");
    return allocation;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
