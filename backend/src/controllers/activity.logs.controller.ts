import type { NextFunction, Request, Response } from "express";
import { getAllActivityService } from "../services/activity-log-service.js";
import AppResponse from "../Response/app-response.js";
export const getActivityController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query: { page?: number; limit?: number } = {};
    if (req.query.page) query.page = Number(req.query.page);
    if (req.query.limit) query.limit = Number(req.query.limit);
    const activities = await getAllActivityService(query);
    AppResponse.ACTIVITY_LOGS.send(res, activities);
  } catch (error) {
    next(error);
  }
};
