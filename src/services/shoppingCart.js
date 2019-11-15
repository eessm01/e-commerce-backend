const MongoLib = require('../lib/mongo');

class ShoppingCartService {
  constructor() {
    this.collection = 'user-cart';
    this.mongoDB = new MongoLib();
  }

  // get user cart products 
  async getProductsCart({ userId}) {
    const query = userId && { userId };
    const productsCart = await this.mongoDB.getAll(this.collection, query);

    return productsCart || [];
  }

  // create cart product, add product to user cart
  async createProductCart({ product }) {
    const createdProductCartId = await this.mongoDB.create(this.collection, product );
    return createdProductCartId;
  }

  // delete cart product, delete product to user cart
  async deleteProductCart({ productId }){
    const deletedProductCart = await this.mongoDB.delete(this.collection,productId);
    return deletedProductCart;
  }
}

module.exports = ShoppingCartService;