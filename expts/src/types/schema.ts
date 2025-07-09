import Joi from 'joi';

export const majorSchema = Joi.object({
  code: Joi.string().max(4).required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().allow('').optional(),
});

export const userSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  majorId: Joi.string().max(40).required(),
});
