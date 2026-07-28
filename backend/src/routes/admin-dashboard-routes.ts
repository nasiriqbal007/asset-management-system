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
  requireRole(["admin", "manager"]),
  totalEmpController,
);
adminDashboard.get(
  "/total-assets",
  authMiddleware,
  requireRole(["admin", "manager"]),
  totalAssetController,
);
adminDashboard.get(
  "/total-allocated",
  authMiddleware,
  requireRole(["admin", "manager"]),
  totalAllocatedController,
);
adminDashboard.get(
  "/total-available",
  authMiddleware,
  requireRole(["admin", "manager"]),
  totalAvailableAssetController,
);
adminDashboard.get(
  "/total-pending",
  authMiddleware,
  requireRole(["admin", "manager"]),
  totalPendingReqController,
);
adminDashboard.get(
  "/status-summary",
  authMiddleware,
  requireRole(["admin", "manager"]),
  assetStatusSummaryController,
);
adminDashboard.get(
  "/top-categories",
  authMiddleware,
  requireRole(["admin", "manager"]),
  topAssetCategoriesController,
);
