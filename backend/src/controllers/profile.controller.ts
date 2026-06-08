import AppError from "../Error/app-error.js";
import type { Request, Response } from "express";
import { getUserProfile } from "../services/auth-service.js";
import type { jwtPayload } from "../types/user-types.js";
import AppResponse from "../Response/app-response.js";

type AuthRequest = Request & { user?: jwtPayload };

export const getProfileController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;

    const user = await getUserProfile(userId);
    if (!user) {
      throw AppError.USER_NOT_FOUND;
    }
    AppResponse.PROFILE_RETRIEVED.send(res, user);
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
