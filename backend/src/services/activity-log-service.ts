import AppError from "../Error/app-error.js";
import { getAllActivityLogs } from "../repositories/activity.logs.js";

export const getAllActivityService = async (query: { page?: number; limit?: number } = {}) => {
  const activity = await getAllActivityLogs(query);
  if (!activity) {
    throw AppError.NOT_FOUND;
  }
  return activity;
};
