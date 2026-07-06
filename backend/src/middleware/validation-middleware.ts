import type { NextFunction, Request, Response } from "express";
import type { ObjectSchema } from "joi";
import AppError from "../Error/app-error.js";

export const validateBody = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      return next(new AppError(error.details[0]?.message || "Validation failed", 400));
    }
    req.body = value;
    next();
  };
};
