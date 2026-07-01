import { useState } from "react";
import type { Asset, AssetCreateInput, AssetUpdateInput } from "../types/asset";
import { useAsset } from "../hooks/useAsset";

import { AssetModal } from "../components/AssetModel";
import { Package } from "lucide-react";
import { useCategories } from "../hooks/useCategories";
import { DropDown } from "../components/DropDown";
import { Input } from "../components/Input";

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
  } = useAsset();
  const { categories } = useCategories();

  const handelSubmit = (data: AssetCreateInput | AssetUpdateInput) => {
    if (assetToEdit) {
      return updateAsset(data as AssetUpdateInput);
    } else {
      return createAsset(data as AssetCreateInput);
    }
  };

  return (
    <div className="px-2 py-2 bg-(--bg-page) min-h-screen">
      {isLoading && (
        <p className="flex items-center justify-center">Loading...</p>
      )}
      <div className="flex flex-wrap justify-between gap-4 items-center">
        <Input
          label="Search"
          type="text"
          placeholder="Search asset name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 min-w-55"
        />

        <DropDown
          label="Status"
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
      </div>
      <div className="flex justify-end">
        <button
          className="primary-button mb-4"
          onClick={() => setOpenModel(true)}
        >
          Add Asset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="bg-(--bg-card) p-4 rounded-lg shadow-md"
          >
            {asset.image_url ? (
              <img
                src={asset.image_url}
                alt={asset.asset_name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-(--bg-page) flex items-center justify-center rounded-md mb-4">
                <Package size={32} className="text-(--text-secondary)" />
              </div>
            )}
            <h3 className="text-lg font-semibold">{asset.asset_name}</h3>

            <p className="text-sm text-(--text-secondary)">
              <span className="font-light ">Serial Number: </span>
              <span className="font-semibold  ">{asset.serial_number}</span>
            </p>
            <p className="text-sm text-(--text-secondary)">
              <span className="font-light ">Category: </span>
              <span className="font-semibold  ">{asset.category_name}</span>
            </p>
            <p className="text-sm text-(--text-secondary)">
              <span className="font-light ">Purchase Date: </span>
              <span className="font-semibold  ">
                {new Date(asset.purchase_date).toLocaleDateString()}
              </span>
            </p>
            <p className="text-sm text-(--text-secondary)">
              <span className="font-light ">Status: </span>
              <span className="font-semibold  ">{asset.status}</span>
            </p>

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
          </div>
        ))}
      </div>

      {isModelOpen && (
        <AssetModal
          asset={assetToEdit}
          onClose={() => {
            setOpenModel(false);
            setAssetToEdit(null);
          }}
          onSubmit={handelSubmit}
        />
      )}
    </div>
  );
};
