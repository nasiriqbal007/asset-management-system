import { Loader } from "lucide-react";

import { useState } from "react";
import { useProfile } from "../hooks/useAuth";
import { useEmployeeAssets } from "../hooks/useEmployeeAssets";
import { AssetCard } from "../components/AssetCard";
import { Pagination } from "../components/Pagination";

export const AvailableAssets = () => {
  const { assets, isLoading, availAsset, setPage } = useEmployeeAssets();
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
    <div className="px-2 pt-6 pb-0 bg-(--bg-page) flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader size={30} className="animate-spin" />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto min-h-0 pr-1 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {assets.data.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                actions={
                  <div className="flex justify-end mt-4">
                    <button
                      className="primary-button"
                      onClick={() => setSelectedAssetId(asset.id)}
                    >
                      Request Asset
                    </button>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      )}

      <div className="shrink-0 -mx-2 mt-4">
        <Pagination
          pagination={assets.pagination}
          onPageChange={setPage}
          className="border-t bg-(--bg-card)"
        />
      </div>

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
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="secondary-button mt-0!"
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
