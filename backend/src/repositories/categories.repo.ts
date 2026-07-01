import { pool } from "../db/pool.js";

export interface Category {
  id: number;
  category_name: string;
}

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const result = await pool.query(
      "SELECT id, category_name FROM categories ORDER BY category_name ASC",
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};
