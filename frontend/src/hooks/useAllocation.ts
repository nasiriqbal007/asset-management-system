import { useEffect, useState } from "react";
import type { Allocation } from "../types/allocation";
import { getAllAllocations, returnAsset } from "../services/allocation.service";
import { handleError } from "../utils/handleError";
import type { PaginatedResponse } from "../types/pagination";

export const useAllocation = () => {
  const [allocations, setAllocations] = useState<PaginatedResponse<Allocation>>(
    {
      data: [],

      pagination: {
        page: 1,
        limit: 10,
        totalPages: 0,
        total: 0,
      },
    },
  );
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchAllocations = async () => {
      setLoading(true);
      try {
        const res = await getAllAllocations({
          page,
          limit: allocations.pagination.limit,
        });

        setAllocations(res.data.payload);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllocations();
  }, [allocations.pagination.limit, page]);
  const handleReturnAsset = async (id: number) => {
    setLoading(true);
    try {
      const res = await returnAsset(id);
      setAllocations((prev) => ({
        ...prev,
        data: prev.data.map((allocation) =>
          allocation.id === id
            ? { ...allocation, returned_date: res.data.payload.returned_date }
            : allocation,
        ),
      }));
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  return { allocations, loading, handleReturnAsset, page, setPage };
};
