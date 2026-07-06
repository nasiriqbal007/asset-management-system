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
import type { PaginatedResponse } from "../types/pagination";

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
          page,
          limit: assets.pagination.limit,
        } as AssetQueryParams);
        setAssets(res.data.payload.assets);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssets();
  }, [debouncedSearchText, status, categoryId, page, assets.pagination.limit]);

  const createAsset = async (data: AssetCreateInput) => {
    setIsLoading(true);
    try {
      const res = await createNewAsset(data);
      setAssets((prev) => ({
        ...prev,
        data: [...prev.data, res.data.payload.data],
      }));
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
      setAssets((prev) => ({
        ...prev,
        data: prev.data.map((a) =>
          a.id === res.data.payload.data.id ? res.data.payload.data : a,
        ),
      }));
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
      setAssets((prev) => ({
        ...prev,
        data: prev.data.filter((a) => a.id !== res.data.payload.data.id),
      }));
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
    page,
    setPage,
  };
};
