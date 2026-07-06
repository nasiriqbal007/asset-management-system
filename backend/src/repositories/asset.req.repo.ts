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

import type { PaginatedResult } from "../types/pagination.js";

export const getAllAssetReq = async (
  query: { page?: number; limit?: number } = {},
): Promise<PaginatedResult<AssetRequest>> => {
  try {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const reqs = await pool.query(
      `SELECT 
  asset_requests.*,
  assets.asset_name,
  employees.name AS employee_name,
  COUNT(*) OVER() as total
FROM asset_requests
LEFT JOIN assets ON asset_requests.asset_id = assets.id
LEFT JOIN employees ON asset_requests.employee_id = employees.id
ORDER BY asset_requests.created_at DESC
LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const total = reqs.rows.length > 0 ? Number(reqs.rows[0].total) : 0;
    const totalPages = Math.ceil(total / limit);
    const data = reqs.rows.map(({ total, ...req }) => req as AssetRequest);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const getRequestsByStatus = async (
  status: ReqStatus,
  query: { page?: number; limit?: number } = {},
): Promise<PaginatedResult<AssetRequest>> => {
  try {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const reqs = await pool.query(
      `SELECT 
  asset_requests.*,
  assets.asset_name,
  employees.name AS employee_name,
  COUNT(*) OVER() as total
FROM asset_requests
LEFT JOIN assets ON asset_requests.asset_id = assets.id
LEFT JOIN employees ON asset_requests.employee_id = employees.id
WHERE asset_requests.status = $1
ORDER BY asset_requests.created_at DESC
LIMIT $2 OFFSET $3`,
      [status, limit, offset],
    );

    const total = reqs.rows.length > 0 ? Number(reqs.rows[0].total) : 0;
    const totalPages = Math.ceil(total / limit);
    const data = reqs.rows.map(({ total, ...req }) => req as AssetRequest);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
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
