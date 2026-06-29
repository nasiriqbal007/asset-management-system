import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { DropDown } from "./DropDown";
import type { Asset, AssetCreateInput } from "../types/asset";
import { useFetchAllDep } from "../hooks/useAuth";

type AssetModalProps = {
  asset?: Asset | null;
  onClose: () => void;
  onSubmit: (data: AssetCreateInput) => void;
};

export const AssetModal = ({ asset, onClose, onSubmit }: AssetModalProps) => {
  const { departments } = useFetchAllDep();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssetCreateInput>({
    defaultValues: asset ?? {},
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-(--bg-card) p-6 rounded-lg w-full max-w-md flex flex-col gap-4">
        <h2 className="text-xl font-bold">
          {asset ? "Edit Asset" : "Add Asset"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input
            label="Asset Name"
            {...register("asset_name", { required: "Asset name is required" })}
            error={errors.asset_name?.message}
          />
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
            {...register("purchase_date", {
              required: "Purchase date is required",
            })}
            error={errors.purchase_date?.message}
          />
          <DropDown
            label="Category"
            options={
              departments?.map((dep) => ({
                value: dep.id,
                label: dep.department_name,
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
