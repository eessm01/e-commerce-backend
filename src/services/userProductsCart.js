const MongoLib = require('../lib/mongo');

class UserProductsCartService {
  constructor() {
    this.collection = 'user-products-cart';
    this.mongoDB = new MongoLib();
  }

  // get cart products 
  async getProductsCart({ userId}) {
    const query = userId && { userId };
    const productsCart = await this.mongoDB.getAll(this.collection, query);

    return productsCart || [];
  }

  // create cart product
  async createProductCart({ product }) {
    // const 
  }
  // delete cart product
}

module.exports = UserProductsCartService;