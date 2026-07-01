import { Loader } from "lucide-react";
import { useEmployee } from "../hooks/employe";
import { useProfile } from "../hooks/useAuth";

export const MyAssets = () => {
  const { allocatedAssets, isLoading, handleReturnAsset } = useEmployee();
  const { profile } = useProfile();
  const myAssets = allocatedAssets.filter(
    (asset) => asset.employee_id === Number(profile?.id),
  );
  return (
    <div className="px-2 py-2 bg-(--bg-page)">
      {isLoading ? (
        <Loader className="flex items-center justify-center " size={30} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {myAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-(--bg-card) p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold">{asset.asset_name}</h3>

              <div className="flex justify-end mt-4 gap-2">
                <button
                  className="secondary-button"
                  onClick={() => {
                    handleReturnAsset(asset.id);
                  }}
                >
                  Return
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
