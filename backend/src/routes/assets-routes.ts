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
import { upload } from "../middleware/multer-middleware.js";

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
  upload.single("image_url"),
  validateAsset(CreateAssetSchema),
  createAssetController,
);

assetRoute.patch(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  upload.single("image_url"),
  validateAsset(UpdateAssetSchema),
  updateAssetController,
);

assetRoute.delete(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  deleteAssetController,
);
