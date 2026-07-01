import { Router } from "express";
import { authMiddleware, requireRole } from "../middleware/auth-middleware.js";
import { getActivityController } from "../controllers/activity.logs.controller.js";

export const logRouter = Router();

logRouter.get(
  "/",
  authMiddleware,
  requireRole(["admin"]),
  getActivityController,
);
