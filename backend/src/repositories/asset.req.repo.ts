import type { PoolClient } from "pg";
import { pool } from "../db/pool.js";
import type {
  AssetRequest,
  CreateAssetRequestInput,
  ReqStatus,
  UpdateAssetRequestInput,
} from "../types/asset-req-type.js";

export const createAssetReq = async (
  data: CreateAssetRequestInput,
): Promise<AssetRequest> => {
  try {
    const newReq = await pool.query(
      `INSERT INTO asset_requests (employee_id, asset_id, request_reason)
        VALUES ($1, $2, $3) RETURNING *`,
      [data.employee_id, data.asset_id, data.request_reason],
    );
    return newReq.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getAssetReqById = async (
  reqId: number,
): Promise<AssetRequest | undefined> => {
  try {
    const req = await pool.query("SELECT * FROM asset_requests WHERE id=$1", [
      reqId,
    ]);
    return req.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getAllAssetReq = async (): Promise<AssetRequest[]> => {
  try {
    const reqs = await pool.query(
      "SELECT * FROM asset_requests ORDER BY created_at DESC",
    );
    return reqs.rows;
  } catch (error) {
    throw error;
  }
};

export const getRequestsByStatus = async (
  status: ReqStatus,
): Promise<AssetRequest[]> => {
  try {
    const reqs = await pool.query(
      "SELECT * FROM asset_requests WHERE status=$1 ORDER BY created_at DESC",
      [status],
    );
    return reqs.rows;
  } catch (error) {
    throw error;
  }
};

export const updateAssetReq = async (
  client: PoolClient,
  reqId: number,
  data: UpdateAssetRequestInput,
): Promise<AssetRequest | undefined> => {
  try {
    const req = await client.query(
      `UPDATE asset_requests 
     SET status = $1
     WHERE id = $2
     RETURNING *`,
      [data.status, reqId],
    );
    return req.rows[0];
  } catch (error) {
    throw error;
  }
};

export const checkDuplicatePendingRequest = async (
  employeeId: number,
  assetId: number,
): Promise<boolean> => {
  try {
    const result = await pool.query(
      "SELECT id FROM asset_requests WHERE employee_id=$1 AND asset_id=$2 AND status='pending'",
      [employeeId, assetId],
    );
    return result.rowCount !== 0;
  } catch (error) {
    throw error;
  }
};
