import Joi from "joi";

export const createAssetReqSchema = Joi.object({
  employee_id: Joi.number().integer().required(),
  asset_id: Joi.number().integer().required(),
  request_reason: Joi.string().required(),
});

export const updateAssetReqSchema = Joi.object({
  status: Joi.string().valid("pending", "approved", "rejected").required(),
});
