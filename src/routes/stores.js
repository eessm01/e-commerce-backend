const express = require("express");
const StoresService = require("../services/stores");
const validationHandler = require('../utils/middleware/validationHandler');
const joi = require('@hapi/joi');

const  {
  storeIdSchema,
  createStoreSchema,
  updateStoreSchema
} = require('../utils/schemas/stores');


const eMomsStoresApi = app => {
  const router = express.Router();
  app.use("/api/", router);

  const storeService = new StoresService();

  // get all stores
  router. get('/stores', async (req, res, next) => {
    try {
      const stores = await storeService.getStores();
      res.status(200).json({
        data: stores,
        message: 'stores listed'
      });
    } catch(err) {
      next(err);
    }
  });

  // get stores by ID
  router.get(
    '/stores/:storeId', 
    validationHandler(joi.object({ storeId: storeIdSchema }), 'params'),
    async (req, res, next) => {
      try {
        const { storeId } = req.params;

        const store = await storeService.getStoreById({ storeId });

        res.status(200).json({
          data: store,
          message: 'product retrieved'
        });
      } catch(err) {
        next(err);
      }
    });

  
  // create store
  router.post(
    '/stores',
    validationHandler(joi.object(createStoreSchema)),
    async (req, res, next) => {
      const { body: store } = req;
      try {
        const createdStoreId = await storeService.createStore({ store });

        res.status(201).json({
          data: createdStoreId,
          message: 'store created'
        });
      } catch(err) {
        next(err);
      }
    });

  // update store
  router.put(
    '/stores/:storeId',
    validationHandler(joi.object(updateStoreSchema)),
    async (req, res, next) => {
      const { storeId } = req.params;
      const { body: store } = req;
      try {
        const updatedStoretId = await storeService.updateStore({ storeId, store });

        res.status(200).json({
          data: updatedStoretId,
          message: 'store updated'
        });

      } catch(err) {
        next(err);
      }
    });

    router.delete(
      '/stores/:storeId',
      validationHandler(joi.object({ storeId: storeIdSchema }), 'params'),
      async (req, res, next) => {
        const { storeId } = req.params;

        try {
          const deletedStoreId = await storeService.deleteStore({ storeId });
          res.status(200).json({
            data: deletedStoreId,
            message: 'deleted store'
          });
        } catch(err) {
          next(err);
        }
      });
  
}

module.exports = eMomsStoresApi;
