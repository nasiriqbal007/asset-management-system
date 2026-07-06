import { Router } from "express";
import { authMiddleware, requireRole } from "../middleware/auth-middleware.js";
import {
  createEmpController,
  deleteEmpController,
  exportEmpCSVController,
  getAllEmpController,
  getEmpByIdController,
  updateEmpController,
} from "../controllers/emp.controller.js";
import { validateBody } from "../middleware/validation-middleware.js";
import { RegisterSchema, updateSchema } from "../validator/user.validator.js";

export const empRouter = Router();

empRouter.get("/", authMiddleware, requireRole(["admin"]), getAllEmpController);
empRouter.get(
  "/export",
  authMiddleware,
  requireRole(["admin"]),
  exportEmpCSVController,
);
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
  validateBody(RegisterSchema),
  createEmpController,
);
empRouter.patch(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  validateBody(updateSchema),
  updateEmpController,
);
empRouter.delete(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  deleteEmpController,
);
