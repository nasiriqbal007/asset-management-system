import { Package } from "lucide-react";
import type { Asset } from "../types/asset";

type AssetCardProps = {
  asset: Asset;
  actions?: React.ReactNode;
};
export const AssetCard = ({ asset, actions }: AssetCardProps) => {
  return (
    <div className="bg-(--bg-card) p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300">
      {asset.image_url ? (
        <img
          src={asset.image_url}
          alt={asset.asset_name}
          className="w-full h-40 object-cover rounded-md mb-2"
        />
      ) : (
        <div className="w-full h-40 bg-(--bg-page) flex items-center justify-center rounded-md mb-2">
          <Package size={50} className="text-(--text-secondary)" />
        </div>
      )}
      <h3 className="text-lg font-semibold">{asset.asset_name}</h3>

      <p className="text-sm text-(--text-secondary)">
        <span className="font-light">Serial Number: </span>
        <span className="font-semibold">{asset.serial_number}</span>
      </p>
      <p className="text-sm text-(--text-secondary)">
        <span className="font-light">Category: </span>
        <span className="font-semibold">{asset.category_name}</span>
      </p>
      <p className="text-sm text-(--text-secondary)">
        <span className="font-light">Purchase Date: </span>
        <span className="font-semibold">
          {new Date(asset.purchase_date).toLocaleDateString()}
        </span>
      </p>
      <p className="text-sm text-(--text-secondary)">
        <span className="font-light">Status: </span>
        <span className="font-semibold">{asset.status}</span>
      </p>
      {actions && <div className="flex justify-center gap-2">{actions}</div>}
    </div>
  );
};
