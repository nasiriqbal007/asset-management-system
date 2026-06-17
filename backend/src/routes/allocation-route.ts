import { Router } from "express";
import { authMiddleware, requireRole } from "../middleware/auth-middleware.js";
import {
  assetReturnController,
  getAllocationController,
} from "../controllers/allocation.controller.js";

export const allocationRouter = Router();

allocationRouter.get(
  "/",
  authMiddleware,
  requireRole(["admin"]),
  getAllocationController,
);
allocationRouter.patch(
  "/:id/return",
  authMiddleware,
  requireRole(["employee"]),
  assetReturnController,
);
