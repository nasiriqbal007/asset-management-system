import { pool } from "../db/pool.js";
import type {
  Asset,
  AssetQuery,
  CreateAssetInput,
  UpdateAsset,
} from "../types/asset-type.js";
import type { PaginatedResult } from "../types/pagination.js";
import { runTransactionWithLog } from "../utils/audit.helper.js";

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

export const createAsset = async (userId: number, data: CreateAssetInput) => {
  return await runTransactionWithLog(
    {
      user_id: userId,
      action: "Create",
      entity_type: "Asset",
    },
    async (client) => {
      const newAsset = await client.query(
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
    },
  );
};

export const getAssets = async (
  query: AssetQuery,
): Promise<PaginatedResult<Asset>> => {
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

    const result = `SELECT a.*, c.category_name,
     COUNT(*) OVER() as total
    FROM assets a 
    LEFT JOIN categories c ON a.category_id=c.id
    ${whereCondition} ORDER BY a.created_at DESC
    LIMIT $${i++} OFFSET $${i++}
    `;

    values.push(limit, offset);

    const assets = await pool.query(result, values);
    const total = assets.rows.length > 0 ? Number(assets.rows[0].total) : 0;
    const totalPages = Math.ceil(total / limit);
    const data = assets.rows.map(
      ({ total, ...assetData }) => assetData as Asset,
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

export const updateAsset = async (
  assetId: number,
  userId: number,
  data: UpdateAsset,
) => {
  return await runTransactionWithLog(
    {
      user_id: userId,
      action: "update",
      entity_type: "Asset",
    },
    async (client) => {
      const updatedAsset = await client.query(
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
    },
  );
};

export const deleteAsset = async (assetId: number, userId: number) => {
  return await runTransactionWithLog(
    {
      user_id: userId,
      action: "update",
      entity_type: "Asset",
    },
    async (client) => {
      const deletedAsset = await client.query(
        "DELETE FROM assets WHERE id=$1 RETURNING *",
        [assetId],
      );
      return deletedAsset.rows[0];
    },
  );
};
