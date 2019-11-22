const stripe = require("stripe")("sk_test_1j0xTN9Vspl6ididuJcDlEIj00RwfaNUgz");

class PaymentService {
  constructor() {
    this.collection = "payments";
    this.mongoDB = null
  }
  /**
   * Crea la intención de un pago
   * @param {{amount: number, currency?: string}} arguments Argumentos de la petición
   */
  async createIntent({ amount, currency = "MXN" }) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency
    });
    return paymentIntent;
  }

  async charge({ token, currency = "MXN", amount, description }) {
    const payload = {
      amount: amount * 10,
      currency,
      description,
      source: token
    };
    console.log({ payload });
    let { status } = await stripe.charges.create(payload);
    return status;
  }
}

module.exports = PaymentService;
