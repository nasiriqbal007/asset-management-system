import Joi from "joi";

export const RegisterSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  departmentId: Joi.number().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("employee", "admin").optional(),
});
export const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
