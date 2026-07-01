export type AssetStatus = "available" | "allocated" | "damaged" | "retired";

export type Asset = {
  id: number;
  asset_name: string;
  image_url: string | null;
  serial_number: string;
  category_id: number;
  category_name?: string | null;
  purchase_date: string;
  status: AssetStatus;
  created_at: string;
};

export type AssetCreateInput = Omit<
  Asset,
  "id" | "created_at" | "category_name" | "image_url"
> & {
  image: File;
};
export type AssetUpdateInput = Partial<AssetCreateInput> & {
  id: number;
};
export type AssetQueryParams = {
  asset_name?: string;
  category_id?: number;
  status?: AssetStatus;
  serial_number?: string;
  page?: number;
  limit?: number;
};
