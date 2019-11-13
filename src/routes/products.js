const express = require("express");
const ProductService = require("../services/products");
const validationHandler = require('../utils/middleware/validationHandler');
const joi = require('@hapi/joi');

const {
  productIdSchema,
  createProductSchema,
  updateProductSchema
} = require('../utils/schemas/products');

const platziStore = app => {
  const router = express.Router();
  app.use("/api/", router);

  const productService = new ProductService();

  router.get("/products", async (req, res, next) => {
    try {
      const { categories } = req.query;

      const storeProducts = await productService.getProducts({ categories });
      res.status(200).json({
        data: storeProducts,
        message: "products listed"
      });
    } catch (err) {
      console.log(err);
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
        console.log("error", err);
      }
    }
  );

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
        console.log("error", err);
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
        console.log("error:", err);
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
        console.log("error:", err);
      }
    }
  );

  router.get("*", (req, res) => {
    res.status(404).send("Error 404");
  });
};

module.exports = platziStore;
