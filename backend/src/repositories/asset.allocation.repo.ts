import { pool } from "../db/pool.js";
import type {
  AssetAllocation,
  createAllocationInput,
} from "../types/allocation.js";
import { runTransactionWithLog } from "./activity.logs.js";

export const createAllocation = async (
  userId: number,
  data: createAllocationInput,
): Promise<AssetAllocation | null> => {
  return await runTransactionWithLog(
    {
      user_id: userId,
      action: "Create",
      entity_type: "Asset Allocation",
      entity_id: userId,
    },
    async (client) => {
      const newAllocation = await client.query(
        `INSERT INTO asset_allocations (
         asset_id, employee_id
       ) VALUES($1, $2) RETURNING *`,
        [data.asset_id, data.employee_id],
      );
      return newAllocation.rows[0] || null;
    },
  );
};

export const assetReturnDate = async (
  id: number,

  userId: number,
): Promise<AssetAllocation | null> => {
  return await runTransactionWithLog(
    {
      user_id: userId,
      action: "Create",
      entity_type: "Asset Allocation",
      entity_id: id,
    },
    async (client) => {
      const update = await client.query(
        "UPDATE asset_allocations SET returned_date = NOW() WHERE id = $1 RETURNING *",
        [id],
      );
      return update.rows[0] || null;
    },
  );
};

export const getAllAllocations = async (): Promise<AssetAllocation[]> => {
  try {
    const allocations = await pool.query(
      `
SELECT asset_allocations.*, assets.asset_name, employees.name AS employee_name
      FROM asset_allocations
      JOIN assets ON asset_allocations.asset_id = assets.id
      JOIN employees ON asset_allocations.employee_id = employees.id
      ORDER BY allocated_date DESC
      `,
    );
    return allocations.rows;
  } catch (error) {
    throw error;
  }
};

export const checkAvailability = async (assetId: number): Promise<boolean> => {
  try {
    const res = await pool.query(
      "SELECT 1 FROM asset_allocations WHERE asset_id=$1 AND returned_date IS NULL LIMIT 1",
      [assetId],
    );

    return (res.rowCount ?? 0) === 0;
  } catch (error) {
    throw error;
  }
};
