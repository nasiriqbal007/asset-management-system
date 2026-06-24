import { Router } from "express";
import {
  departmentController,
  LoginController,
  RegisterController,
} from "../controllers/auth.controller.js";
import {
  authMiddleware,
  validateLogin,
  validateRegister,
} from "../middleware/auth-middleware.js";
import { LoginSchema, RegisterSchema } from "../validator/user.validator.js";
import { getProfileController } from "../controllers/profile.controller.js";
import { limiter } from "../middleware/rate-limit.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  limiter,
  validateRegister(RegisterSchema),
  RegisterController,
);
authRouter.post("/login", limiter, validateLogin(LoginSchema), LoginController);
authRouter.get("/profile", authMiddleware, getProfileController);
authRouter.get("/departments", departmentController);
