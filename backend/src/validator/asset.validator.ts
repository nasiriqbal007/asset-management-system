import Joi from "joi";

export const CreateAssetSchema = Joi.object({
  asset_name: Joi.string().min(2).required(),

  category_id: Joi.number().required(),
  serial_number: Joi.string().min(3).required(),
  purchase_date: Joi.date().max("now").required(),
  status: Joi.string()
    .valid("available", "allocated", "damaged", "retired")
    .required(),
});

export const UpdateAssetSchema = Joi.object({
  asset_name: Joi.string().min(2).optional(),

  category_id: Joi.number().optional(),
  serial_number: Joi.string().min(3).optional(),
  purchase_date: Joi.date().max("now").optional(),
  status: Joi.string()
    .valid("available", "allocated", "damaged", "retired")
    .optional(),
}).min(1);
