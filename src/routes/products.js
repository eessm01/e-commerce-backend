const express = require("express");
const ProductService = require("../services/products");
const validationHandler = require('../utils/middleware/validationHandler');
const joi = require('@hapi/joi');

const {
  productIdSchema,
  createProductSchema,
  updateProductSchema
} = require('../utils/schemas/products');

const eMomsProducts = app => {
  const router = express.Router();
  app.use("/api/", router);

  const productService = new ProductService();

  router.get("/products", async (req, res, next) => {
    try {
      const { categories } = req.query;
      
      const products = await productService.getProducts({ categories });
      res.status(200).json({
        data: products,
        message: "products listed"
      });
    } catch (err) {
      next(err);
    }
  });

  // obtener producto por id
  router.get(
    "/products/:productId",
    validationHandler(joi.object({ productId: productIdSchema }), 'params'),
    async (req, res, next) => {
      const { productId } = req.params;
      try {
        const product = await productService.getProduct({ productId });
        res.status(200).json({
          data: product,
          message: "product retrieved"
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get("/productsbystore/:storeId", async (req, res, next) => {
    const { storeId: id_store } = req.params;
   
    try {      
      const products = await productService.getProductsByStore({ id_store });
      res.status(200).json({
        data: products,
        message: "products listed"
      });
    } catch (err) {
      next(err);
    }
  });

  // crear producto
  router.post(
    "/products",
    validationHandler(joi.object(createProductSchema)),
    async function(req, res, next) {
      const { body: product } = req;
      try {
        const createdProductId = await productService.createProduct({
          product
        });
        res.status(201).json({
          data: createdProductId,
          message: "product created"
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // actualizar producto
  router.put(
    "/products/:productId",
    validationHandler(joi.object({ productId: productIdSchema }), 'params'),
    validationHandler(joi.object(updateProductSchema)),
    async function(req, res, next) {
      const { productId } = req.params;
      const { body: product } = req;

      try {
        const updatedProductId = await productService.updateProduct({
          productId,
          product
        });
        res.status(200).json({
          data: updatedProductId,
          message: "product updated"
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // eliminar producto
  router.delete(
    "/products/:productId",
    validationHandler(joi.object({ productId: productIdSchema }), "params"),
    async function(req, res, next) {
      const { productId } = req.params;

      try {
        const deletedProductId = await productService.deleteProduct({
          productId
        });
        res.status(200).json({
          data: deletedProductId,
          message: "deleted product"
        });
      } catch (err) {
        next(err);
      }
    }
  );

};

module.exports = eMomsProducts;
