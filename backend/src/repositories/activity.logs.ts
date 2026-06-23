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
      `INSERT INTO activity_logs(user_id, action,entity_type) VALUES($1,$2,$3) RETURNING *`,
      [audit.user_id, audit.action, audit.entity_type],
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
    const logs = await pool.query("SELECT * FROM activity_logs");
    return logs.rows;
  } catch (error) {
    throw error;
  }
};
