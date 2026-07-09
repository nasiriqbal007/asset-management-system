/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
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
import type { PaginatedResponse } from "../types/pagination";
import toast from "react-hot-toast";
import axios from "axios";

export const useAsset = () => {
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
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState<AssetStatus | "">("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const limit = 10;
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const [isLoading, setIsLoading] = useState(true);
  const fetchAssets = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllAssetList({
        asset_name: debouncedSearchText || undefined,
        status: status || undefined,
        category_id: categoryId === "" ? undefined : categoryId,
        page,
        limit: limit,
      } as AssetQueryParams);
      setAssets(res.data.payload.assets);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setAssets((prev) => ({
          ...prev,
          data: [],
          pagination: { ...prev.pagination, total: 0, totalPages: 1 },
        }));
      } else {
        handleError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, debouncedSearchText, page, status]);
  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const createAsset = async (data: AssetCreateInput) => {
    setIsLoading(true);
    try {
      const res = await createNewAsset(data);
      const newAsset = res.data.payload;
      setAssets((prev) => ({
        ...prev,
        data: [...prev.data, newAsset],
      }));
      toast.success(res.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAsset = async (id: number, data: AssetUpdateInput) => {
    setIsLoading(true);
    try {
      const res = await updateCurrentAsset(id, data);
      const updatedAsset = res.data.payload;
      await fetchAssets();
      setAssets((prev) => ({
        ...prev,
        data: prev.data.map((a) =>
          a.id === updatedAsset.id ? updatedAsset : a,
        ),
      }));

      toast.success(res.data.message);
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
      await fetchAssets();
      setAssets((prev) => ({
        ...prev,
        data: prev.data.filter((a) => a.id !== res.data.payload.data),
      }));
      toast.success("Asset deleted successfully");
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
      toast.success("Assets exported successfully");
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
    page,
    setPage,
  };
};
