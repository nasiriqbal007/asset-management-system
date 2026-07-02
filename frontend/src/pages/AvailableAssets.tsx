import { Loader, Package } from "lucide-react";

import { useState } from "react";
import { useProfile } from "../hooks/useAuth";
import { useEmployeeAssets } from "../hooks/useEmployeeAssets";

export const AvailableAssets = () => {
  const { assets, isLoading, availAsset } = useEmployeeAssets();
  const [reason, setReason] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);

  const { profile } = useProfile();

  const handleRequestAsset = (assetId: number, reason: string) => {
    const requestData = {
      employee_id: profile?.id ? Number(profile.id) : 0,
      asset_id: assetId,
      request_reason: reason,
    };

    availAsset(requestData);
  };
  console.log("Assets in AvailableAssets component:", profile?.id);
  return (
    <div className="px-2 py-2 bg-(--bg-page)">
      {isLoading ? (
        <Loader className="flex items-center justify-center " size={30} />
      ) : (
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

              <div className="flex justify-end mt-4">
                <button
                  className="primary-button"
                  onClick={() => setSelectedAssetId(asset.id)}
                >
                  Request Asset
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAssetId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-(--bg-card) p-4 rounded border border-(--border) flex flex-col gap-3 w-80">
            <input
              type="text"
              placeholder="Reason..."
              value={reason}
              className="input-field"
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="secondary-button "
                onClick={() => setSelectedAssetId(null)}
              >
                Cancel
              </button>
              <button
                className="primary-button mt-0!"
                onClick={() => {
                  handleRequestAsset(selectedAssetId, reason);
                  setSelectedAssetId(null);
                  setReason("");
                }}
              >
                Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
