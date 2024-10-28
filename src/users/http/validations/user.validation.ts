import Joi from "joi";

export const createUserSchema = Joi.object({
  firstName: Joi.string().min(1).max(255).required(),
  lastName: Joi.string().min(1).max(255).required(),
  phone: Joi.string().min(10).max(20).required(),
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(255).required(),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().min(1).max(255),
  lastName: Joi.string().min(1).max(255),
  phone: Joi.string().min(10).max(20),
  email: Joi.string().email(),
  username: Joi.string().min(3).max(50),
  password: Joi.string().min(6).max(255),
}).min(1);

export const loginUserSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().min(6).max(255).required(),
});
