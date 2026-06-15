import type { NextFunction, Request, Response } from "express";
import {
  AddAsset,
  deleteAssetId,
  getAllAsset,
  getAssetById,
  updatedAsset,
} from "../services/asset-service.js";
import AppResponse from "../Response/app-response.js";

export const getAllAssetsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const assets = await getAllAsset();
    AppResponse.GET_ALL_Assets.send(res, assets);
  } catch (error) {
    next(error);
  }
};
export const getAssetByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const assetId = Number(req.params.id);
    const asset = await getAssetById(assetId);
    AppResponse.Item_BY_ID.send(res, asset);
  } catch (error) {
    next(error);
  }
};

export const createAssetController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newAsset = await AddAsset(req.body);
    AppResponse.ITEM_CREATED.send(res, newAsset);
  } catch (error) {
    next(error);
  }
};
export const updateAssetController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const assetId = Number(req.params.id);
    const asset = await updatedAsset(assetId, req.body);
    AppResponse.UPDATED_ITEM.send(res, asset);
  } catch (error) {
    next(error);
  }
};

export const deleteAssetController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const assetId = Number(req.params.id);
    const deleteAsset = await deleteAssetId(assetId);
    AppResponse.DELETED_ITEM.send(res, deleteAsset);
  } catch (error) {
    next(error);
  }
};
