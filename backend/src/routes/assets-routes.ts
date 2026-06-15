import { Router } from "express";
import { authMiddleware, requireRole } from "../middleware/auth-middleware.js";
import {
  createAssetController,
  deleteAssetController,
  getAllAssetsController,
  getAssetByIdController,
  updateAssetController,
} from "../controllers/asset.controller.js";
import { validateAsset } from "../middleware/asset-middleware.js";
import {
  CreateAssetSchema,
  UpdateAssetSchema,
} from "../validator/asset.validator.js";

export const assetRoute = Router();
assetRoute.get(
  "/",
  authMiddleware,
  requireRole(["admin"]),
  getAllAssetsController,
);
assetRoute.get(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  getAssetByIdController,
);
assetRoute.post(
  "/",
  authMiddleware,
  requireRole(["admin"]),
  validateAsset(CreateAssetSchema),
  createAssetController,
);

assetRoute.patch(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  validateAsset(UpdateAssetSchema),
  updateAssetController,
);

assetRoute.delete(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  deleteAssetController,
);
