import type { NextFunction, Request, Response } from "express";
import { getAllActivityService } from "../services/activity-log-service.js";
import AppResponse from "../Response/app-response.js";
export const getActivityController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const activities = await getAllActivityService({ page, limit });
    AppResponse.ACTIVITY_LOGS.send(res, activities);
  } catch (error) {
    next(error);
  }
};
