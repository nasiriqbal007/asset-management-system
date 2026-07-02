import { useEffect, useState } from "react";
import type {
  Asset,
  AssetCreateInput,
  AssetQueryParams,
  AssetStatus,
  AssetUpdateInput,
} from "../types/asset";
import {
  createNewAsset,
  deleteAsset,
  exportAssetsCSV,
  getAllAssetList,
  updateCurrentAsset,
} from "../services/asset.service";
import { handleError } from "../utils/handleError";

export const useAsset = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState<AssetStatus | "">("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAssets = async () => {
      setIsLoading(true);
      try {
        const res = await getAllAssetList({
          asset_name: debouncedSearchText || undefined,
          status: status || undefined,
          category_id: categoryId === "" ? undefined : categoryId,
        } as AssetQueryParams);
        setAssets(res.data.payload.assets.data);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssets();
  }, [debouncedSearchText, status, categoryId]);

  const createAsset = async (data: AssetCreateInput) => {
    setIsLoading(true);
    try {
      const res = await createNewAsset(data);
      setAssets((prevAssets) => [...prevAssets, res.data.payload.data]);
    } catch (error) {
      handleError(error);
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
      handleError(error);
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
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportAssetsData = async () => {
    try {
      const res = await exportAssetsCSV();
      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "assets.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      handleError(error);
    }
  };

  return {
    assets,
    isLoading,
    createAsset,
    updateAsset,
    AssetDelete,
    exportAssetsData,
    searchText,
    setSearchText,
    status,
    setStatus,
    categoryId,
    setCategoryId,
  };
};
