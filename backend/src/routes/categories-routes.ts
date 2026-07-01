import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { getCategoriesController } from "../controllers/categories.controller.js";

export const categoriesRoute = Router();

categoriesRoute.get("/", authMiddleware, getCategoriesController);
