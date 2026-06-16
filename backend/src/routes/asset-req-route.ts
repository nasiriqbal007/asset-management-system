import { Router } from "express";
import {
  getAllReqController,
  getReqByStatusController,
  updateReqController,
  getReqByIdController,
  createReqController,
} from "../controllers/asset.req.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth-middleware.js";
import { validateAssetReqData } from "../middleware/asset-req-middleware.js";
import { createAssetReqSchema } from "../validator/asset.req.validator.js";

export const assetReqRouter = Router();
assetReqRouter.get(
  "/",
  authMiddleware,
  requireRole(["admin"]),
  getAllReqController,
);
assetReqRouter.get(
  "/status/:status",
  authMiddleware,
  requireRole(["admin"]),
  getReqByStatusController,
);
assetReqRouter.get(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  getReqByIdController,
);

assetReqRouter.patch(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  validateAssetReqData(createAssetReqSchema),
  updateReqController,
);
assetReqRouter.post(
  "/",
  authMiddleware,
  requireRole(["employee"]),
  validateAssetReqData(createAssetReqSchema),
  createReqController,
);
