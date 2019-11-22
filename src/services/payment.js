const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const MongoLib = require('../lib/mongo');

class PaymentService {
    constructor() {
        this.collection = 'payments'
        this.mongoDB = new MongoLib()
    }
    /**
     * Crea la intención de un pago
     * @param {{amount: number, currency?: string}} arguments Argumentos de la petición
     */
    async createIntent({amount, currency = 'MXN'}) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });
        return paymentIntent
    }
}

module.exports = PaymentService