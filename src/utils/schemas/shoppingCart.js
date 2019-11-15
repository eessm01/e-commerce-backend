const joi = require('@hapi/joi');

const { userIdSchema } = require('./users');
const { productIdSchema } = require('./products');

const shoppingCartIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createShoppingCartSchema = {
  userId: userIdSchema,
  productId: productIdSchema
}

module.exports = {
  shoppingCartIdSchema,
  createShoppingCartSchema
}