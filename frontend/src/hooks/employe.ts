import { useEffect, useState } from "react";
import type { Asset } from "../types/asset";
import {
  getAllAssetForEmp,
  reqForAsset,
  returnAsset,
} from "../services/employeside.service";
import type { CreateAssetRequestInput } from "../types/request";
import type { Allocation } from "../types/allocation";
import { getAllAllocated } from "../services/dashboard.service";

export const useEmployee = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [allocatedAssets, setAllocatedAssets] = useState<Allocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      setIsLoading(true);
      try {
        const res = await getAllAssetForEmp();
        setAssets(res.data.payload.assets.data);
        console.log(
          "Assets fetched successfully:",
          res.data.payload.assets.data,
        );
      } catch (error) {
        console.error("Error fetching assets:", error);
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
        const res = await getAllAllocated();
        setAllocatedAssets(res.data.payload.allocations.data);
        console.log(
          "Allocated Assets fetched successfully:",
          res.data.payload.allocations.data,
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllocatedAssets();
  }, []);
  const handleReturnAsset = async (id: number) => {
    try {
      await returnAsset(id);
      setAssets((prevAssets) => prevAssets.filter((asset) => asset.id !== id));
    } catch (error) {
      console.error("Error returning asset:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const availAsset = async (data: CreateAssetRequestInput) => {
    setIsLoading(true);
    try {
      const res = await reqForAsset(data);
      console.log("Asset requested successfully:", res.data);
    } catch (error) {
      console.error("Error requesting asset:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return { assets, isLoading, handleReturnAsset, availAsset, allocatedAssets };
};
