import { pool } from "../db/pool.js";
import type { UpdateEmpType } from "../types/user-types.js";

export const deleteEmployee = async (empId: number) => {
  try {
    const result = await pool.query(
      "DELETE FROM employees WHERE id=$1 RETURNING *",
      [empId],
    );
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};
export const getAllEmployees = async () => {
  try {
    const result = await pool.query(
      `SELECT e.id, e.name,d.department_name as department FROM employees e 
      LEFT JOIN departments d on e.department_id=d.id WHERE role='employee'`,
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};
export const getEmployeeById = async (empId: number) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, department_id, role FROM employees WHERE id = $1",
      [empId],
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
export const updateEmployee = async (empId: number, data: UpdateEmpType) => {
  try {
    const result = await pool.query(
      "UPDATE employees SET name=$1, department_id=$2, email=$3 WHERE id=$4 RETURNING *",

      [data.name, data.departmentId, data.email, empId],
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};
