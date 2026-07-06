import { pool } from "../db/pool.js";
import type { PaginatedResult } from "../types/pagination.js";
import type { QueryUser, UpdateEmpType, User } from "../types/user-types.js";

export const deleteEmployee = async (empId: number) => {
  try {
    const result = await pool.query(
      "UPDATE employees SET deleted_at = NOW() WHERE id=$1 RETURNING *",
      [empId],
    );
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};
export const getAllEmployees = async (
  query: QueryUser,
): Promise<PaginatedResult<User>> => {
  try {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const offset = (page - 1) * limit;
    const conditions: string[] = ["role = 'employee'", "e.deleted_at IS NULL"];
    const values: unknown[] = [];
    let i = 1;
    if (query.name) {
      conditions.push(`e.name ILIKE $${i++}`);
      values.push(`%${query.name}%`);
    }
    if (query.department_id) {
      conditions.push(`e.department_id=$${i++}`);
      values.push(query.department_id);
    }
    const limitIndex = i++;
    const offsetIndex = i++;
    values.push(limit);
    values.push(offset);

    const result = await pool.query(
      `SELECT e.id, e.name,e.email,e.role, e.created_at, e.department_id, d.department_name as department,
      COUNT(*) OVER() as total
       FROM employees e 
       LEFT JOIN departments d ON e.department_id = d.id 
       WHERE ${conditions.join(" AND ")}
       LIMIT $${limitIndex} OFFSET $${offsetIndex}`,
      values,
    );
    const total = result.rows.length > 0 ? Number(result.rows[0].total) : 0;
    const totalPages = Math.ceil(total / limit);

    const data = result.rows.map(({ total, ...user }) => user as User);
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
export const getEmployeeById = async (
  empId: number,
): Promise<User | undefined> => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, department_id, role FROM employees WHERE id = $1 AND deleted_at IS NULL",
      [empId],
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
export const updateEmployee = async (
  empId: number,
  data: UpdateEmpType,
): Promise<User> => {
  try {
    const result = await pool.query(
      "UPDATE employees SET name=$1, department_id=$2, email=$3 WHERE id=$4 RETURNING *",

      [data.name, data.department_id, data.email, empId],
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};
export const getAllEmployeesForExport = async (): Promise<User[]> => {
  const result = await pool.query(
    `SELECT e.id, e.name, e.department_id, d.department_name as department
     FROM employees e 
     LEFT JOIN departments d ON e.department_id = d.id 
     WHERE role = 'employee' AND e.deleted_at IS NULL`,
  );
  return result.rows;
};
