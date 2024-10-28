import Joi from "joi";

export const createReportSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).max(1000).required(),
});

export const updateReportSchema = Joi.object({
  title: Joi.string().min(1).max(255),
  description: Joi.string().min(1).max(1000),
}).min(1);
