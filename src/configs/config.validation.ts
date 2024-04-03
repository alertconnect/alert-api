import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  APP_PORT: Joi.number().default(3000).required(),
  DATABASE_URL: Joi.string().required(),
  API_KEY: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379).required(),
  REDIS_USERNAME: Joi.string().default('default').required(),
  REDIS_PASSWORD: Joi.string().default('').required(),
});
