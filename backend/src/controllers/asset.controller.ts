import type { NextFunction, Request, Response } from "express";
import {
  AddAsset,
  deleteAssetId,
  getAllAsset,
  getAllAssetCSVExportService,
  getAssetById,
  updatedAsset,
} from "../services/asset-service.js";
import fs from "fs";
import AppResponse from "../Response/app-response.js";
import AppError from "../Error/app-error.js";
import type { AssetQuery } from "../types/asset-type.js";

export const getAllAssetsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const categoryId = req.query.category_id
      ? Number(req.query.category_id)
      : undefined;
    const assetQuery: AssetQuery = {
      asset_name: req.query.asset_name?.toString().trim(),
      serial_number: req.query.serial_number?.toString().trim(),
      status: req.query.status?.toString().trim(),
      category_id: categoryId,
      page: page,
      limit: limit,
    } as AssetQuery;

    const assets = await getAllAsset(assetQuery);
    AppResponse.GET_ALL_Assets.send(res, {
      assets,
    });
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
    if (!req.file) {
      throw AppError.IMAGE_REQ;
    }
    const userId = Number(req.params.userId);
    const newAsset = await AddAsset(userId, {
      ...req.body,
      image_url: req.file?.path,
    });
    AppResponse.ITEM_CREATED.send(res, newAsset);
  } catch (error) {
    fs.unlink(req.file?.path || "", (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
    next(error);
  }
};
export const updateAssetController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params.userId);
    const assetId = Number(req.params.id);
    const asset = await updatedAsset(assetId, userId, {
      ...req.body,
      image_url: req.file?.path,
    });
    AppResponse.UPDATED_ITEM.send(res, asset);
  } catch (error) {
    fs.unlink(req.file?.path || "", (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
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
    const userId = Number(req.params.userId);

    const deleteAsset = await deleteAssetId(assetId, userId);
    AppResponse.DELETED_ITEM.send(res, deleteAsset);
  } catch (error) {
    next(error);
  }
};
export const exportAssetCSVController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const assets = await getAllAssetCSVExportService();
    if (!assets || assets.length === 0) {
      throw AppError.USER_NOT_FOUND;
    }

    const headers = Object.keys(assets[0]!);

    let csv = headers.join(",") + "\n";
    assets.forEach((a) => {
      const row = Object.values(a);

      csv += row.join(",") + "\n";
    });
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename='assets.csv' ");
    res.send(csv);
  } catch (error) {
    next(error);
  }
};
