import type { NextFunction, Request, Response } from "express";
import type { ObjectSchema } from "joi";

export const validateAssetReqData = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(error);
    }
    req.body = value;
    next();
  };
};
