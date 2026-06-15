type AssetStatus = "available" | "allocated" | "damaged" | "retired";

export type Asset = {
  id: number;
  asset_name: string;
  image_url: string | null;
  serial_number: string;
  category_id: number;
  purchase_date: string;
  status: AssetStatus;
  created_at: string;
};

export type CreateAssetInput = {
  asset_name: string;
  image_url?: string | null;
  serial_number: string;
  category_id: number;
  purchase_date: string;
  status?: AssetStatus;
};

export type UpdateAsset = Partial<{
  asset_name: string;
  image_url: string | null;
  serial_number: string;
  category_id: number;
  purchase_date: string;
  status: AssetStatus;
}>;
