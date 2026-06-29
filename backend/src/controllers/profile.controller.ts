import AppError from "../Error/app-error.js";
import type { Request, Response, NextFunction } from "express";
import { getUserProfile } from "../services/auth-service.js";
import type { jwtPayload } from "../types/user-types.js";
import AppResponse from "../Response/app-response.js";

type AuthRequest = Request & { user?: jwtPayload };

export const getProfileController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;

    const user = await getUserProfile(userId);
    if (!user) {
      throw AppError.USER_NOT_FOUND;
    }
    AppResponse.PROFILE_RETRIEVED.send(res, user);
  } catch (error) {
    next(error);
  }
};
