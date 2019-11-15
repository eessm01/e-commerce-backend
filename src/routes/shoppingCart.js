const express = require('express');

const ShoppingCartService = require('../services/shoppingCart');
const validationHandler = require('../utils/middleware/validationHandler');

// schemas
const { userIdSchema } = require('../utils/schemas/users');
const { productIdSchema } = require('../utils/schemas/products');
const { createShoppingCartSchema } = require('../utils/schemas/shoppingCart');

function shoppinCartApi(app) {
  const router = express.Router();
  app.use('api/shoppping-cart', router);

  const shoppingCartService = new ShoppingCartService();

  // get shopping cart products
  router.get(
    '/',
    validationHandler({ userId: userIdSchema }, 'query'),
    async (req, res, next) => {
      const { userId } = req.query;

      try {
        const productsCart = await shoppingCartService.getProductsCart({ userId });

        res.status(200).json({
          data: productsCart,
          message: 'shopping cart products listed'
        });
      } catch(err) {
        next(err);
      }
    });

  // add shopping cart product 
  router.post(
    '/',
    validationHandler(createShoppingCartSchema),
    async (req, res, next) => {
      const { body: shoppingCartProduct } = req;

      try {
        const createShoppingCartId = await shoppingCartService.createProductCart({ shoppingCartProduct });

        res.status(201).json({
          data: createShoppingCartId,
          message: 'shopping cart product created'
        });
      } catch(err) {
        next(err);
      }
    });

  router.delete(
    '/:shoppingCartId',
    async (req, res, nex) => {
      const { shoppingCartId } = req.params;

      try {
        const deleteShoppingCartId = await shoppingCartService.deleteProductCart({ shoppingCartId });

        res.status(200).json({
          data: shoppingCartId,
          message: 'shopping cart product deleted'
        });
      } catch(err) {
        nex(err);
      }
    });
}

module.exports = shoppinCartApi;