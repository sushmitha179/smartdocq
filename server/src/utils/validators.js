// server/src/utils/validators.js
import Joi from 'joi';

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/[a-z]/)  // at least one lowercase
    .pattern(/[A-Z]/)  // at least one uppercase
    .pattern(/[0-9]/)  // at least one number
    .required(),
  name: Joi.string().min(2).max(50).allow('', null)
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  remember: Joi.boolean().default(true)
});

export const conversationCreateSchema = Joi.object({
  title: Joi.string().allow('', null),
  isPermanent: Joi.boolean().default(false),
  isTemporary: Joi.boolean().default(true)
});
