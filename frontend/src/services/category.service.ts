import api from "../api/api";
import type { Category } from "../types/category";

export const getAllCategories = () =>
  api.get<{
    payload: any; categories: Category[] 
}>("/categories");
