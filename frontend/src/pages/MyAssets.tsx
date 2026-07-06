import { Loader } from "lucide-react";
import { useEmployeeAssets } from "../hooks/useEmployeeAssets";
import { useProfile } from "../hooks/useAuth";

export const MyAssets = () => {
  const { allocatedAssets, isLoading, handleReturnAsset } = useEmployeeAssets();
  const { profile } = useProfile();
  const myAssets = allocatedAssets.filter(
    (asset) => asset.employee_id === Number(profile?.id),
  );
  return (
    <div className="px-2 pt-6 pb-0 bg-(--bg-page) flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader size={30} className="animate-spin" />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto min-h-0 pr-1 pb-6">
          {myAssets.length === 0 ? (
            <div className="flex flex-col h-full items-center justify-center  text-center text-(--text-secondary) ">
              <p className="font-semibold text-lg">No Assets Allocated</p>
              <p className="text-sm font-light mt-1">
                You have no allocated assets.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {myAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-(--bg-card) p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
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
      )}
    </div>
  );
};
