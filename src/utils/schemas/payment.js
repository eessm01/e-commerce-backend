const joi = require("@hapi/joi");

const paymentTokenSchema = joi.string().max(80);
const paymentCurrencySchema = joi.string().allow("MXN", "mxn", "usd", "USD");
const paymentAmmountSchema = joi.number();
const paymentDescriptionSchema = joi.string().max(300);

const paymentChargeSchema = {
  token_id: paymentTokenSchema.required(),
  currency: paymentCurrencySchema.optional(),
  amount: paymentAmmountSchema.required(),
  description: paymentDescriptionSchema.required()
};

module.exports = {
  paymentChargeSchema
};
