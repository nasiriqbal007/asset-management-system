import { useEffect, useState } from "react";
import type { Asset } from "../types/asset";
import {
  getAllAssetForEmp,
  reqForAsset,
  returnAsset,
  getMyAllocations,
} from "../services/employeeAsset.service";
import type { CreateAssetRequestInput } from "../types/request";
import type { Allocation } from "../types/allocation";
import type { PaginatedResponse } from "../types/pagination";

import { handleError } from "../utils/handleError";
import toast from "react-hot-toast";

export const useEmployeeAssets = () => {
  const [assets, setAssets] = useState<PaginatedResponse<Asset>>({
    data: [],
    pagination: {
      page: 1,
      totalPages: 1,
      limit: 10,
      total: 0,
    },
  });
  const [page, setPage] = useState<number>(1);
  const [allocatedAssets, setAllocatedAssets] = useState<Allocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      setIsLoading(true);
      try {
        const res = await getAllAssetForEmp({
          page,
          limit: assets.pagination.limit,
        });
        setAssets(res.data.payload.assets);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssets();
  }, [assets.pagination.limit, page]);

  useEffect(() => {
    const fetchAllocatedAssets = async () => {
      setIsLoading(true);
      try {
        const res = await getMyAllocations();
        setAllocatedAssets(res.data.payload.allocations.data);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllocatedAssets();
  }, []);

  const handleReturnAsset = async (id: number) => {
    try {
      await returnAsset(id);
      setAllocatedAssets((prevAllocated) =>
        prevAllocated.filter((alloc) => alloc.id !== id),
      );
      toast.success("Asset returned successfully");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const availAsset = async (data: CreateAssetRequestInput) => {
    setIsLoading(true);
    try {
      await reqForAsset(data);
      toast.success("Asset request submitted successfully");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    assets,
    isLoading,
    handleReturnAsset,
    availAsset,
    allocatedAssets,
    page,
    setPage,
  };
};
