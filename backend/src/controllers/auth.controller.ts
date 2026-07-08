import type { NextFunction, Request, Response } from "express";
import {
  authenticate,
  getAllDepService,
  registerUser,
} from "../services/auth-service.js";

import AppResponse from "../Response/app-response.js";

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
    AppResponse.LOGIN_SUCCESSFUL.send(res, { user, token });
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
