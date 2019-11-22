const express = require("express");
const PaymentService = require("../services/payment");
const validationHandler = require("../utils/middleware/validationHandler");
const joi = require("@hapi/joi");

const eMomsPaymentsApi = app => {
  const router = express.Router();
  app.use("/api/", router);
  const paymentService = new PaymentService();

  // Create intent endpoint
  router.post("/payments/intent", async (req, res, next) => {
    try {
      const { amount, currency } = req.query;
      const intent = await paymentService.createIntent({ amount, currency });
      res.status(200).json({
        data: intent,
        message: "Intent Created"
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = eMomsPaymentsApi;
