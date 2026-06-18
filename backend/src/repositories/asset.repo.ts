import { pool } from "../db/pool.js";
import type {
  Asset,
  AssetQuery,
  CreateAssetInput,
  UpdateAsset,
} from "../types/asset-type.js";

export const checkSerialNumberExists = async (serialNumber: string) => {
  try {
    const result = await pool.query(
      "SELECT id FROM assets WHERE serial_number = $1",
      [serialNumber],
    );
    return result.rowCount !== 0;
  } catch (error) {
    throw error;
  }
};

export const createAsset = async (data: CreateAssetInput) => {
  try {
    const newAsset = await pool.query(
      `INSERT INTO assets 
      (asset_name, image_url, category_id, serial_number, purchase_date, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        data.asset_name,
        data.image_url,
        data.category_id,
        data.serial_number,
        data.purchase_date,
        data.status,
      ],
    );

    return newAsset.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getAssets = async (query: AssetQuery): Promise<Asset[]> => {
  try {
    const conditions: string[] = [];
    const values: unknown[] = [];
    let i = 1;
    if (query.asset_name) {
      conditions.push(`asset_name ILIKE $${i++}`);
      values.push(`%${query.asset_name}%`);
    }
    if (query.serial_number) {
      conditions.push(`serial_number=$${i++}`);
      values.push(query.serial_number);
    }
    if (query.category_id !== undefined) {
      conditions.push(`category_id=$${i++}`);
      values.push(query.category_id);
    }
    if (query.status) {
      conditions.push(`status=$${i++}`);
      values.push(query.status);
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const offset = (page - 1) * limit;
    const whereCondition =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const result = `SELECT a.*, c.category_name FROM assets a 
    LEFT JOIN categories c ON a.category_id=c.id
    ${whereCondition} ORDER BY a.created_at DESC
    LIMIT $${i++} OFFSET $${i++}
    `;
    console.log(values);
    values.push(limit, offset);
    console.log(values);
    console.log(conditions);

    const assets = await pool.query(result, values);

    return assets.rows;
  } catch (error) {
    throw error;
  }
};

export const assetById = async (assetId: number) => {
  try {
    const asset = await pool.query("SELECT * FROM assets WHERE id=$1", [
      assetId,
    ]);

    return asset.rows[0];
  } catch (error) {
    throw error;
  }
};

export const updateAsset = async (assetId: number, data: UpdateAsset) => {
  try {
    const updatedAsset = await pool.query(
      `UPDATE assets 
       SET 
       asset_name=$1,
       image_url=$2,
       category_id=$3,
       serial_number=$4,
       purchase_date=$5,
       status=$6
       WHERE id=$7
       RETURNING *`,
      [
        data.asset_name,
        data.image_url,
        data.category_id,
        data.serial_number,
        data.purchase_date,
        data.status,
        assetId,
      ],
    );

    return updatedAsset.rows[0];
  } catch (error) {
    throw error;
  }
};

export const deleteAsset = async (assetId: number) => {
  try {
    const deletedAsset = await pool.query(
      "DELETE FROM assets WHERE id=$1 RETURNING *",
      [assetId],
    );

    return deletedAsset.rows[0];
  } catch (error) {
    throw error;
  }
};
