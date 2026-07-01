import { pool } from "../db/pool.js";
import type { AuditLog, CreateAuditLogInput } from "../types/audit-log.js";

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
export const getAllActivityLogs = async (): Promise<AuditLog[]> => {
  try {
    const logs = await pool.query(`SELECT a.*, e.name FROM activity_logs a
    JOIN employees e ON a.user_id = e.id  ORDER BY a.created_at DESC  `);
    return logs.rows;
  } catch (error) {
    throw error;
  }
};
