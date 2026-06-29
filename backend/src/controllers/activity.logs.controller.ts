import type { NextFunction, Request, Response } from "express";
import { getAllActivityService } from "../services/activity-log-service.js";
import AppResponse from "../Response/app-response.js";
export const getActivityController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const activities = await getAllActivityService();
    AppResponse.ACTIVITY_LOGS.send(res, activities);
  } catch (error) {
    next(error);
  }
};
