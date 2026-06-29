import { useEffect, useState } from "react";
import type { Asset, AssetCreateInput, AssetUpdateInput } from "../types/asset";
import {
  createNewAsset,
  deleteAsset,
  getAllAssetList,
  updateCurrentAsset,
} from "../services/asset.service";

export const useAsset = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAssets = async () => {
      setIsLoading(true);
      try {
        const res = await getAllAssetList();
        setAssets(res.data.payload.assets.data);
        console.log("assets fetched ", res.data.payload);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const createAsset = async (data: AssetCreateInput) => {
    setIsLoading(true);
    try {
      const res = await createNewAsset(data);
      setAssets((prevAssets) => [...prevAssets, res.data.payload.data]);
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAsset = async (data: AssetUpdateInput) => {
    setIsLoading(true);
    try {
      const res = await updateCurrentAsset(data);
      setAssets((prevAssets) =>
        prevAssets.map((a) =>
          a.id === res.data.payload.data.id ? res.data.payload.data : a,
        ),
      );
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const AssetDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await deleteAsset(id);
      setAssets((prevAssets) =>
        prevAssets.filter((a) => a.id !== res.data.payload.data.id),
      );
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { assets, isLoading, createAsset, updateAsset, AssetDelete };
};
