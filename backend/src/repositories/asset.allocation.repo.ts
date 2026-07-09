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
      const allocation = update.rows[0] || null;
      if (allocation) {
        await client.query(
          "UPDATE assets SET status = $1 WHERE id = $2",
          ["available", allocation.asset_id],
        );
      }
      return allocation;
    },
  );
};

import type { PaginatedResult } from "../types/pagination.js";

export const getAllAllocations = async (
  query: { page?: number; limit?: number } = {},
): Promise<PaginatedResult<AssetAllocation>> => {
  try {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const allocations = await pool.query(
      `
SELECT asset_allocations.*, assets.asset_name, employees.name AS employee_name, COUNT(*) OVER() as total
      FROM asset_allocations
      JOIN assets ON asset_allocations.asset_id = assets.id
      JOIN employees ON asset_allocations.employee_id = employees.id
      ORDER BY allocated_date DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    const total =
      allocations.rows.length > 0 ? Number(allocations.rows[0].total) : 0;
    const totalPages = Math.ceil(total / limit);
    const data = allocations.rows.map(
      ({ total, ...alloc }) => alloc as AssetAllocation,
    );

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

export const getEmployeeAllocations = async (
  employeeId: number,
): Promise<AssetAllocation[]> => {
  try {
    const allocations = await pool.query(
      `
SELECT asset_allocations.*, assets.asset_name, employees.name AS employee_name
      FROM asset_allocations
      JOIN assets ON asset_allocations.asset_id = assets.id
      JOIN employees ON asset_allocations.employee_id = employees.id
      WHERE asset_allocations.employee_id = $1 AND asset_allocations.returned_date IS NULL
      ORDER BY allocated_date DESC
      `,
      [employeeId],
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
