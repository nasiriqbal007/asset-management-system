import { useEffect, useState } from "react";

import { handleError } from "../utils/handleError";
import type { Department } from "../types/departments";
import { getAllDepartments } from "../services/department.service";

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await getAllDepartments();
        setDepartments(res.data.payload);
        
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { departments, isLoading };
};
