import { pool } from "../db/pool.js";

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
    console.log(totalAsset);
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
