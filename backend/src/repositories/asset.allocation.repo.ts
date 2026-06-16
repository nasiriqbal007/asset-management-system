import { pool } from "../db/pool.js";
import type {
  AssetAllocation,
  createAllocationInput,
} from "../types/allocation.js";

export const createAllocation = async (
  data: createAllocationInput,
): Promise<AssetAllocation | null> => {
  try {
    const newAllocation = await pool.query(
      `INSERT INTO asset_allocations (
         asset_id, employee_id
       ) VALUES($1, $2) RETURNING *`,
      [data.asset_id, data.employee_id],
    );
    return newAllocation.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

export const assetReturnDate = async (
  id: number,
): Promise<AssetAllocation | null> => {
  try {
    const update = await pool.query(
      "UPDATE asset_allocations SET return_date = NOW() WHERE id = $1 RETURNING *",
      [id],
    );
    return update.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

export const getAllAllocations = async (): Promise<AssetAllocation[]> => {
  try {
    const allocations = await pool.query(
      "SELECT * FROM asset_allocations ORDER BY allocated_date DESC",
    );
    return allocations.rows;
  } catch (error) {
    throw error;
  }
};
