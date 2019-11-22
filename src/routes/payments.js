const express = require("express");
const PaymentService = require("../services/payment");
const validationHandler = require("../utils/middleware/validationHandler");
const joi = require("@hapi/joi");
const { paymentChargeSchema } = require("../utils/schemas/payment");

const eMomsPaymentsApi = app => {
  const router = express.Router();
  app.use("/api/payments/", router);

  const paymentService = new PaymentService();

  // Create intent endpoint
  router.post("/intent", async (req, res, next) => {
    try {
      const { amount, currency } = req.body;
      const intent = await paymentService.createIntent({ amount, currency });
      res.status(200).json({
        data: intent,
        message: "Intent Created"
      });
    } catch (error) {
      next(error);
    }
  });

  router.post(
    "/charge",
    validationHandler(joi.object(paymentChargeSchema)),
    async (req, res, next) => {
      try {
        const { token_id, currency = "MXN", amount, description } = req.body;
        console.log({ token_id, currency, amount, description });

        const status = await paymentService.charge({
          token: token_id,
          currency,
          amount,
          description
        });
        res.status(200).json({ data: status, message: "Payment succesfull" });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = eMomsPaymentsApi;
