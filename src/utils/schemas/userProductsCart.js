const joi = require('@hapi/joi');

const { userIdSchema } = require('./users');
const { productIdSchema } = require('./products');

const userProductCartIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserProductsCartSchema = {
  userId: userIdSchema,
  productId: productIdSchema
}

module.exports = {
  userProductCartIdSchema,
  createUserProductsCartSchema
}