const joi = require('@hapi/joi');

const { userIdSchema } = require('./users');

const storeIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createStoreSchema = {
  name: joi.string().max(100).required(),
  web: joi.string().uri(),
  email: joi.string().email(),
  facebook_url: joi.string().uri(),
  twitter_url: joi.string().uri(),
  instagram_url: joi.string().uri(),
  userId: userIdSchema,
}

const updateStoreSchema = {
  name: joi.string().max(100),
  web: joi.string().uri(),
  email: joi.string().email(),
  facebook_url: joi.string().uri(),
  twitter_url: joi.string().uri(),
  instagram_url: joi.string().uri(),
  userId: userIdSchema,
}

module.exports = {
  storeIdSchema,
  createStoreSchema,
  updateStoreSchema
}