import { Router } from "express";
import { authMiddleware, requireRole } from "../middleware/auth-middleware.js";
import {
  createAssetController,
  deleteAssetController,
  exportAssetCSVController,
  getAllAssetsController,
  getAssetByIdController,
  updateAssetController,
} from "../controllers/asset.controller.js";
import { validateBody } from "../middleware/validation-middleware.js";
import {
  CreateAssetSchema,
  UpdateAssetSchema,
} from "../validator/asset.validator.js";
import { upload } from "../middleware/multer-middleware.js";

export const assetRoute = Router();
assetRoute.get(
  "/",
  authMiddleware,
  requireRole(["admin", "employee"]),
  getAllAssetsController,
);
assetRoute.get(
  "/export",
  authMiddleware,
  requireRole(["admin"]),
  exportAssetCSVController,
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
  validateBody(CreateAssetSchema),
  createAssetController,
);

assetRoute.patch(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  upload.single("image_url"),
  validateBody(UpdateAssetSchema),
  updateAssetController,
);

assetRoute.delete(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  deleteAssetController,
);
