import { Router } from "express";
import { authMiddleware, requireRole } from "../middleware/auth-middleware.js";

import {
  assetStatusSummaryController,
  totalEmpController,
  totalAllocatedController,
  totalAssetController,
  totalAvailableAssetController,
  totalPendingReqController,
  topAssetCategoriesController,
} from "../controllers/admin.dashboard.controller.js";

export const adminDashboard = Router();

adminDashboard.get(
  "/total-employees",
  authMiddleware,
  requireRole(["admin"]),
  totalEmpController,
);
adminDashboard.get(
  "/total-assets",
  authMiddleware,
  requireRole(["admin"]),
  totalAssetController,
);
adminDashboard.get(
  "/total-allocated",
  authMiddleware,
  requireRole(["admin"]),
  totalAllocatedController,
);
adminDashboard.get(
  "/total-available",
  authMiddleware,
  requireRole(["admin"]),
  totalAvailableAssetController,
);
adminDashboard.get(
  "/total-pending",
  authMiddleware,
  requireRole(["admin"]),
  totalPendingReqController,
);
adminDashboard.get(
  "/status-summary",
  authMiddleware,
  requireRole(["admin"]),
  assetStatusSummaryController,
);
adminDashboard.get(
  "/top-categories",
  authMiddleware,
  requireRole(["admin"]),
  topAssetCategoriesController,
);
