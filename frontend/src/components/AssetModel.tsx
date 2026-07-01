import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { DropDown } from "./DropDown";
import type { Asset, AssetCreateInput, AssetUpdateInput } from "../types/asset";
import { useCategories } from "../hooks/useCategories";
import { useEffect, useState } from "react";

type AssetModalProps = {
  asset?: Asset | null;
  onClose: () => void;
  onSubmit: (data: AssetCreateInput | AssetUpdateInput) => void;
};

export const AssetModal = ({ asset, onClose, onSubmit }: AssetModalProps) => {
  const { categories } = useCategories();
  const [file, setImageFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssetCreateInput | AssetUpdateInput>();
  useEffect(() => {
    if (asset && categories?.length) {
      reset({
        ...asset,
        purchase_date: asset.purchase_date?.split("T")[0],
        category_id: Number(asset.category_id),
      });
    }
  }, [asset, categories, reset]);

  const handleFormSubmit = (data: AssetCreateInput | AssetUpdateInput) => {
    const formData = new FormData();
    formData.append("asset_name", data.asset_name ?? "");
    formData.append("serial_number", data.serial_number ?? "");
    formData.append("purchase_date", data.purchase_date ?? "");
    formData.append("category_id", String(data.category_id));
    formData.append("status", data.status ?? "");
    if (file) {
      formData.append("image_url", file);
    }
    onSubmit(formData as unknown as AssetCreateInput | AssetUpdateInput);
    console.log(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-(--bg-card) p-6 rounded-lg w-full max-w-md flex flex-col gap-4">
        <h2 className="text-xl font-bold">
          {asset ? "Edit Asset" : "Add Asset"}
        </h2>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-3"
        >
          <Input
            label="Asset Name"
            {...register("asset_name", { required: "Asset name is required" })}
            error={errors.asset_name?.message}
          />
          <div className="flex flex-col gap-2">
            <label className="text(--text-primary) text-md">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="input-field"
            />
          </div>
          <Input
            label="Serial Number"
            {...register("serial_number", {
              required: "Serial number is required",
            })}
            error={errors.serial_number?.message}
          />
          <Input
            label="Purchase Date"
            type="date"
            max={new Date().toISOString().split("T")[0]}
            {...register("purchase_date", {
              required: "Purchase date is required",
            })}
            error={errors.purchase_date?.message}
          />
          <DropDown
            label="Category"
            options={
              categories?.map((cat) => ({
                value: cat.id,
                label: cat.category_name,
              })) ?? []
            }
            error={errors.category_id?.message}
            {...register("category_id", {
              required: "Category is required",
              valueAsNumber: true,
            })}
          />
          <DropDown
            label="Status"
            options={[
              { value: "available", label: "Available" },
              { value: "allocated", label: "Allocated" },
              { value: "damaged", label: "Damaged" },
              { value: "retired", label: "Retired" },
            ]}
            error={errors.status?.message}
            {...register("status", { required: "Status is required" })}
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="secondary-button"
            >
              Cancel
            </button>
            <button type="submit" className="primary-button">
              {asset ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
