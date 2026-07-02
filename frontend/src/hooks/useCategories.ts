import { useEffect, useState } from "react";
import type { Category } from "../types/category";
import { getAllCategories } from "../services/category.service";
import { handleError } from "../utils/handleError";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await getAllCategories();
        setCategories(res.data.payload.categories);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading };
};
