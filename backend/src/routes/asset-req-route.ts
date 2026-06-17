import { Router } from "express";
import {
  getAllReqController,
  getReqByStatusController,
  getReqByIdController,
  createReqController,
  approveReqController,
  rejectReqController,
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
  "/:id/approve",
  authMiddleware,
  requireRole(["admin"]),
  approveReqController,
);
assetReqRouter.patch(
  "/:id/reject",
  authMiddleware,
  requireRole(["admin"]),
  rejectReqController,
);
assetReqRouter.post(
  "/",
  authMiddleware,
  requireRole(["employee"]),
  validateAssetReqData(createAssetReqSchema),
  createReqController,
);
