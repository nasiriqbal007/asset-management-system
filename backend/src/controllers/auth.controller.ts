import type { NextFunction, Request, Response } from "express";
import {
  authenticate,
  getAllDepService,
  registerUser,
} from "../services/auth-service.js";

import AppResponse from "../Response/app-response.js";
import { config } from "../config/env.js";

export const RegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await registerUser(req.body);
    AppResponse.USER_REGISTERED.send(res, user);
  } catch (error) {
    next(error);
  }
};

export const LoginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, token } = await authenticate(req.body);
    res.cookie("token", token, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: "strict",
      maxAge: 5 * 60 * 1000,
    });
    AppResponse.LOGIN_SUCCESSFUL.send(res, { user });
  } catch (error) {
    next(error);
  }
};
export const departmentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const department = await getAllDepService();
    AppResponse.GET_ALL_EMP.send(res, department);
  } catch (error) {
    next(error);
  }
};
