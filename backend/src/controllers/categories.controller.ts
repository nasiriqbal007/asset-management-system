import type { NextFunction, Request, Response } from "express";
import { getAllCategories } from "../repositories/categories.repo.js";
import AppResponse from "../Response/app-response.js";

export const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await getAllCategories();
    AppResponse.GET_ALL_Assets.send(res, {
      categories,
    });
  } catch (error) {
    next(error);
  }
};
