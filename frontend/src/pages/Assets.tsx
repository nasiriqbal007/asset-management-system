import { useState } from "react";
import type { Asset, AssetCreateInput, AssetUpdateInput } from "../types/asset";
import { useAsset } from "../hooks/useAsset";
import { Table } from "../components/Table";
import { AssetModal } from "../components/AssetModel";

export const Assets = () => {
  const [isModelOpen, setOpenModel] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState<Asset | null>(null);
  const { assets, isLoading, createAsset, updateAsset, AssetDelete } =
    useAsset();

  const columns = [
    { key: "id", label: "ID" },
    { key: "asset_name", label: "Asset Name" },
    { key: "image_url", label: "Image" },
    { key: "serial_number", label: "Serial Number" },
    { key: "category_id", label: "Category ID" },
    { key: "category_name", label: "Category" },
    { key: "purchase_date", label: "Purchase Date" },
    { key: "status", label: "Status" },
    { key: "created_at", label: "Created At" },
  ];
  const actions = [
    {
      label: "Edit",
      onClick: (row: Asset) => {
        setAssetToEdit(row);
        setOpenModel(true);
      },
    },

    {
      label: "delete",
      onClick: (row: Asset) => {
        AssetDelete(row.id);
      },
    },
  ];
  const handelSubmit = (data: AssetCreateInput | AssetUpdateInput) => {
    if (assetToEdit) {
      return createAsset(data as AssetCreateInput);
    } else {
      return updateAsset(data as AssetUpdateInput);
    }
  };
  return (
    <div className="px-2 py2 bg-(--bg-page)">
      {isLoading && (
        <p className="flex items-center justify-center">Loading...</p>
      )}
      <div className="flex justify-end">
        <button
          className="primary-button mb-4"
          onClick={() => setOpenModel(true)}
        >
          Add Employee
        </button>
      </div>

      <Table columns={columns} data={assets} actions={actions} />

      {isModelOpen && (
        <AssetModal
          asset={assetToEdit}
          onClose={() => {
            setOpenModel(true);
            setAssetToEdit(null);
          }}
          onSubmit={handelSubmit}
        />
      )}
    </div>
  );
};
