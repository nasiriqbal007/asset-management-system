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

import { handleError } from "../utils/handleError";

export const useEmployeeAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [allocatedAssets, setAllocatedAssets] = useState<Allocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      setIsLoading(true);
      try {
        const res = await getAllAssetForEmp();
        setAssets(res.data.payload.assets.data);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssets();
  }, []);
  useEffect(() => {
    const fetchAllocatedAssets = async () => {
      setIsLoading(true);
      try {
        const res = await getMyAllocations();
        setAllocatedAssets(res.data.payload.allocations.data);
        console.log(res.data.payload.allocations.data);
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
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { assets, isLoading, handleReturnAsset, availAsset, allocatedAssets };
};
