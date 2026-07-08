import { pool } from "../db/pool.js";
import type { AuditLog, CreateAuditLogInput } from "../types/audit-log.js";

import type { PaginatedResult } from "../types/pagination.js";

export const runTransactionWithLog = async <T>(
  audit: CreateAuditLogInput,
  operation: (query: any) => Promise<T>,
): Promise<T> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await operation(client);
    await client.query(
      `INSERT INTO activity_logs(user_id, action,entity_type, entity_id) VALUES($1,$2,$3,$4) RETURNING *`,
      [audit.user_id, audit.action, audit.entity_type, audit.entity_id],
    );
    await client.query("COMMIT");
    return result;
    
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
export const getAllActivityLogs = async (
  query: { page?: number; limit?: number } = {},
): Promise<PaginatedResult<AuditLog>> => {
  try {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const logs = await pool.query(
      `SELECT a.*, e.name, COUNT(*) OVER() as total FROM activity_logs a
       JOIN employees e ON a.user_id = e.id  
       ORDER BY a.created_at DESC  
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const total = logs.rows.length > 0 ? Number(logs.rows[0].total) : 0;
    const totalPages = Math.ceil(total / limit);
    const data = logs.rows.map(({ total, ...log }) => log as AuditLog);

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
