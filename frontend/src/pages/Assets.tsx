import { useState } from "react";
import type { Asset, AssetCreateInput, AssetUpdateInput } from "../types/asset";
import { useAsset } from "../hooks/useAsset";

import { AssetModal } from "../components/AssetModel";

import { useCategories } from "../hooks/useCategories";
import { DropDown } from "../components/DropDown";

import { SearchInput } from "../components/SearchInput";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AssetCard } from "../components/AssetCard";
import { FileDown } from "lucide-react";
import { Pagination } from "../components/Pagination";

export const Assets = () => {
  const [isModelOpen, setOpenModel] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState<Asset | null>(null);
  const {
    assets,
    isLoading,
    createAsset,
    updateAsset,
    AssetDelete,
    searchText,
    setSearchText,
    status,
    setStatus,
    categoryId,
    setCategoryId,
    exportAssetsData,
    setPage,
  } = useAsset();
  const { categories } = useCategories();

  const handelSubmit = async (data: AssetCreateInput | AssetUpdateInput) => {
    if (assetToEdit?.id) {
      await updateAsset(assetToEdit.id, data as AssetUpdateInput);
    } else {
      await createAsset(data as AssetCreateInput);
    }
    setOpenModel(false);
  };

  return (
    <div className="px-2 pt-6 pb-0 bg-(--bg-page) flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex flex-wrap justify-between gap-4 items-center shrink-0 pb-4">
        <SearchInput
          placeholder="Search asset name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <DropDown
          label="Status"
          layout="horizontal"
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          options={[
            { value: "available", label: "Available" },
            { value: "allocated", label: "Allocated" },
            { value: "damaged", label: "Damaged" },
            { value: "retired", label: "Retired" },
          ]}
        />

        <DropDown
          label="Category"
          layout="horizontal"
          value={categoryId}
          onChange={(e) =>
            setCategoryId(e.target.value ? Number(e.target.value) : "")
          }
          options={
            categories?.map((cat) => ({
              value: cat.id,
              label: cat.category_name,
            })) ?? []
          }
        />
        <div className="flex justify-end">
          <button
            className="primary-button mb-4"
            onClick={() => setOpenModel(true)}
          >
            Add Asset
          </button>
        </div>
        <button
          className="primary-button mb-4 "
          onClick={() => exportAssetsData()}
        >
          <FileDown className="w-5 h-5" />
        </button>
      </div>
      {isLoading && <LoadingSpinner />}

      <div className="flex-1 overflow-y-auto min-h-0 pr-1 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets.data
            .filter((asset) => asset && asset.id)
            .map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                actions={
                  <div className="flex justify-end mt-4 gap-2">
                    <button
                      className="secondary-button"
                      onClick={() => {
                        setAssetToEdit(asset);
                        setOpenModel(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="secondary-button danger-button "
                      onClick={() => AssetDelete(asset.id)}
                    >
                      Delete
                    </button>
                  </div>
                }
              />
            ))}
        </div>
      </div>

      <div className="shrink-0 -mx-2 mt-4">
        <Pagination
          pagination={assets.pagination}
          onPageChange={setPage}
          className="border-t bg-(--bg-card)"
        />
      </div>

      {isModelOpen && (
        <AssetModal
          asset={assetToEdit}
          onClose={() => {
            setOpenModel(false);
            setAssetToEdit(null);
          }}
          isLoading={isLoading}
          onSubmit={handelSubmit}
        />
      )}
    </div>
  );
};
