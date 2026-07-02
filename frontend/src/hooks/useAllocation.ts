import { useEffect, useState } from "react";
import type { Allocation } from "../types/allocation";
import { getAllAllocations, returnAsset } from "../services/allocation.service";
import { handleError } from "../utils/handleError";

export const useAllocation = () => {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchAllocations = async () => {
      setLoading(true);
      try {
        const res = await getAllAllocations();
        setAllocations(res.data.payload);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllocations();
  }, []);
  const handleReturnAsset = async (id: number) => {
    setLoading(true);
    try {
      const res = await returnAsset(id);
      setAllocations((prev) =>
        prev.map((allocation) =>
          allocation.id === id
            ? { ...allocation, returned_date: res.data.payload.returned_date }
            : allocation,
        ),
      );
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  return { allocations, loading, handleReturnAsset };
};
