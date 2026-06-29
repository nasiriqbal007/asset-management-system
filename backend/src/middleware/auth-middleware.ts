import type { NextFunction, Request, Response } from "express";
import AppError from "../Error/app-error.js";
import type { ObjectSchema } from "joi";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import type { jwtPayload } from "../types/user-types.js";

export const validateRegister = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body);

    if (error) {
      return next(new Error(error.details[0]?.message));
    }
    req.body = value;
    next();
  };
};
export const validateLogin = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      return next(new Error(error.details[0]?.message));
    }
    req.body = value;
    next();
  };
};

export const updateEmpValidate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      return next(new Error(error.details[0]?.message));
    }
    req.body = value;
    next();
  };
};
export const authMiddleware = (
  req: Request & { user?: jwtPayload },
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw AppError.UNAUTHORIZED;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as jwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    throw AppError.UNAUTHORIZED;
  }
};
export const requireRole = (role: string[]) => {
  return (
    req: Request & { user?: jwtPayload },
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) return next(AppError.FORBIDDEN);
    if (!role.includes(req.user.role)) {
      return next(AppError.FORBIDDEN);
    }
    next();
  };
};
