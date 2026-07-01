import { Loader, Package } from "lucide-react";
import { useEmployee } from "../hooks/employe";
import { Input } from "../components/Input";
import { useState } from "react";
import { useProfile } from "../hooks/useAuth";

export const AvailableAssets = () => {
  const { assets, isLoading, availAsset } = useEmployee();
  const [reason, setReason] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);

  const { profile } = useProfile();

  const handleRequestAsset = (assetId: number, reason: string) => {
    const requestData = {
      employee_id: profile?.id ? Number(profile.id) : 0,
      asset_id: assetId,
      request_reason: reason,
    };
    console.log("Request Data:", requestData);
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

              <div className="flex justify-end mt-4 gap-2">
                {selectedAssetId === asset.id ? (
                  <div className="flex gap-2">
                    <Input
                      label="Reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                    <button
                      className="primary-button"
                      onClick={() => {
                        handleRequestAsset(asset.id, reason);
                        setSelectedAssetId(null);
                        setReason("");
                      }}
                    >
                      Request
                    </button>
                  </div>
                ) : (
                  <button
                    className="primary-button"
                    onClick={() => setSelectedAssetId(asset.id)}
                  >
                    Request Asset
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
