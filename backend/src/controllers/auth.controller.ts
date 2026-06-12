import type { NextFunction, Request, Response } from "express";
import { authenticate, registerUser } from "../services/auth-service.js";
import AppError from "../Error/app-error.js";
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

export const LoginController = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authenticate(req.body);
    AppResponse.LOGIN_SUCCESSFUL.send(res, { user, token });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unexpected error occurred",
      });
    }
  }
};
