import { Router } from "express";
import { authMiddleware, requireRole } from "../middleware/auth-middleware.js";
import {
  createEmpController,
  deleteEmpController,
  getAllEmpController,
  getEmpByIdController,
  updateEmpController,
} from "../controllers/emp.controller.js";

export const empRouter = Router();

empRouter.get("/", authMiddleware, requireRole(["admin"]), getAllEmpController);
empRouter.get(
  "/:id",
  authMiddleware,
  requireRole(["admin", "employee"]),
  getEmpByIdController,
);
empRouter.post(
  "/",
  authMiddleware,
  requireRole(["admin"]),
  createEmpController,
);
empRouter.patch(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  updateEmpController,
);
empRouter.delete(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  deleteEmpController,
);
