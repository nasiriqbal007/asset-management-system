import { Router } from "express";
import { authMiddleware, requireRole } from "../middleware/auth-middleware.js";
import {
  assetReturnController,
  getAllocationController,
  getEmployeeAllocationsController,
} from "../controllers/allocation.controller.js";

export const allocationRouter = Router();

allocationRouter.get(
  "/",
  authMiddleware,
  requireRole(["admin"]),
  getAllocationController,
);
allocationRouter.get(
  "/my-allocations",
  authMiddleware,
  requireRole(["employee"]),
  getEmployeeAllocationsController,
);
allocationRouter.patch(
  "/:id/return",
  authMiddleware,
  requireRole(["employee"]),
  assetReturnController,
);
