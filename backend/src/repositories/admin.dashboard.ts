import { pool } from "../db/pool.js";

export interface DashboardStatusSummary {
  Available: number;
  Allocated: number;
  Pending: number;
  Maintenance: number;
  Total: number;
}

export const totalEmployees = async (): Promise<number> => {
  try {
    const totalEmp = await pool.query(
      `SELECT COUNT(*) AS total FROM employees where role='employee'`,
    );
    return Number(totalEmp.rows[0].total);
  } catch (error) {
    throw error;
  }
};

export const getTotalAssets = async (): Promise<number> => {
  try {
    const totalAsset = await pool.query("SELECT COUNT(*) AS total FROM assets");
   
    return Number(totalAsset.rows[0].total);
  } catch (error) {
    throw error;
  }
};
export const getTotalAllocations = async (): Promise<number> => {
  try {
    const totalAsset = await pool.query(
      "SELECT COUNT(*) AS total FROM asset_allocations",
    );
    return Number(totalAsset.rows[0].total);
  } catch (error) {
    throw error;
  }
};

export const getTotalAvailableAssets = async (): Promise<number> => {
  try {
    const totalAsset = await pool.query(
      "SELECT COUNT(*) AS total FROM assets WHERE status='available'",
    );
    return Number(totalAsset.rows[0].total);
  } catch (error) {
    throw error;
  }
};

export const getTotalPendingReq = async (): Promise<number> => {
  try {
    const totalPenReq = await pool.query(
      "SELECT COUNT(*) AS total FROM asset_requests WHERE status='pending'",
    );
    return Number(totalPenReq.rows[0].total);
  } catch (error) {
    throw error;
  }
};

export const getAssetStatusSummary = async (): Promise<DashboardStatusSummary> => {
  try {
    const [availableRes, allocatedRes, pendingRes, maintenanceRes, totalRes] =
      await Promise.all([
        pool.query("SELECT COUNT(*) AS total FROM assets WHERE status='available'"),
        pool.query("SELECT COUNT(*) AS total FROM assets WHERE status='allocated'"),
        pool.query(
          "SELECT COUNT(*) AS total FROM asset_requests WHERE status='pending'",
        ),
        pool.query(
          "SELECT COUNT(*) AS total FROM assets WHERE status IN ('damaged', 'retired')",
        ),
        pool.query("SELECT COUNT(*) AS total FROM assets"),
      ]);

    return {
      Available: Number(availableRes.rows[0].total),
      Allocated: Number(allocatedRes.rows[0].total),
      Pending: Number(pendingRes.rows[0].total),
      Maintenance: Number(maintenanceRes.rows[0].total),
      Total: Number(totalRes.rows[0].total),
    };
  } catch (error) {
    throw error;
  }
};

export interface TopAssetCategory {
  name: string;
  count: number;
  percentage: number;
}

export const getTopAssetCategories = async (): Promise<TopAssetCategory[]> => {
  try {
    const result = await pool.query(
      `SELECT 
         c.category_name AS name,
         COUNT(a.id)::int AS count,
         ROUND((COUNT(a.id)::decimal / NULLIF((SELECT COUNT(*) FROM assets WHERE deleted_at IS NULL), 0)) * 100, 1)::float AS percentage
       FROM assets a
       JOIN categories c ON a.category_id = c.id
       WHERE a.deleted_at IS NULL
       GROUP BY c.category_name, c.id
       ORDER BY count DESC`
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};
