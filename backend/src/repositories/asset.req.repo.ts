import { pool } from "../db/pool.js";
import type { CreateAssetRequestInput } from "../types/asset-req-type.js";

export const createAssetReq = async (data: CreateAssetRequestInput) => {
  const newReq = await pool.query(
    `INSERT INTO asset_requests (employee_id, asset_id, request_reason)
        VALUES ($1, $2, $3) RETURNING *`,
    [data.employee_id, data.asset_id, data.request_reason],
  );
  return newReq.rows[0];
};

export const getAssetReqById = async (reqId: number) => {
  const req = await pool.query("SELECT * FROM asset_requests WHERE id=$1", [
    reqId,
  ]);
  return req.rows[0];
};

export const getAllAssetReq = async () => {
  const reqs = await pool.query(
    "SELECT * FROM asset_requests ORDER BY created_at DESC",
  );
  return reqs.rows;
};

export const getRequestsByStatus = async (status: string) => {
  const reqs = await pool.query(
    "SELECT * FROM asset_requests WHERE status=$1 ORDER BY created_at DESC",
    [status],
  );
  return reqs.rows;
};

export const updateAssetReq = async (
  reqId: number,
  data: Partial<CreateAssetRequestInput>,
) => {
  const req = await pool.query(
    `UPDATE asset_requests 
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [data.status, reqId],
  );
  return req.rows[0];
};

export const checkDuplicatePendingRequest = async (
  employeeId: number,
  assetId: number,
) => {
  const result = await pool.query(
    "SELECT id FROM asset_requests WHERE employee_id=$1 AND asset_id=$2 AND status='pending'",
    [employeeId, assetId],
  );
  return result.rowCount !== 0;
};
