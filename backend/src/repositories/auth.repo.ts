import { pool } from "../db/pool.js";
import AppError from "../Error/app-error.js";
import type { CreateUserInput } from "../types/user-types.js";

export const createUser = async (createUser: CreateUserInput) => {
  try {
    const depId = await pool.query("SELECT id FROM departments WHERE id = $1", [
      createUser.department_id,
    ]);
    if (depId.rowCount === 0) {
      throw AppError.NOT_FOUND;
    }
    const result = await pool.query(
      "INSERT INTO employees (name,email,department_id,password, role) VALUES ($1,$2,$3,$4, $5) RETURNING *",
      [
        createUser.name,
        createUser.email,
        createUser.department_id,
        createUser.password,
        createUser.role || "employee",
      ],
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, department_id, password, role FROM employees WHERE email = $1 AND deleted_at IS NULL",
      [email],
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getAllDepartments = async () => {
  const result = await pool.query(
    "SELECT id, department_name FROM departments",
  );
  return result.rows;
};
