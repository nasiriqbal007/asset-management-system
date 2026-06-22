import type { NextFunction, Request, Response } from "express";
import type { ObjectSchema } from "joi";

export const validateAsset = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      throw new Error(error.details[0]?.message);
    }
    req.body = value;
    next(error);
  };
};
