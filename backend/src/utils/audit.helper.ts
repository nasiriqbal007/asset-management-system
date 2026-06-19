import { pool } from "../db/pool.js";
import type { CreateAuditLogInput } from "../types/audit-log.js";

export const runTransactionWithLog = async <T>(
  audit: CreateAuditLogInput,
  operation: (query: any) => Promise<T>,
): Promise<T> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await operation(client);
    await client.query(
      `INSERT INTO audit_logs(user_id, action,entity_type) VALUES($1,$2,$3) RETURNING *`,
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
