import AppError from "../Error/app-error.js";
import { getAllActivityLogs } from "../repositories/activity.logs.js";

export const getAllActivityService = async () => {
  const activity = await getAllActivityLogs();
  if (!activity) {
    throw AppError.NOT_FOUND;
  }
  return activity;
};
