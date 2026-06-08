import { Router } from "express";
import {
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

export const authRouter = Router();

authRouter.post(
  "/register",
  validateRegister(RegisterSchema),
  RegisterController,
);
authRouter.post("/login", validateLogin(LoginSchema), LoginController);
authRouter.get("/profile", authMiddleware, getProfileController);
