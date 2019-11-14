const MongoLib = require('../lib/mongo');

class StoresServices {
  constructor() {
    this.collection = 'stores';
    this.mongoDB = new MongoLib();
  }

  async getStores(){
    const stores = await this.mongoDB.getAll(this.collection, null);
    return stores || [];
  } 

  async getStoreById({ storeId }){
    const stores = await this.mongoDB.getById(this.collection,storeId);
    return stores || {};
  }

  async createStore({ store }){
    const storeId = await this.mongoDB.create(this.collection, store);
    return storeId;
  }

  async updateStore({ storeId, store } = {}) {
    const updatedStoretId = await this.mongoDB.update(this.collection, storeId, store);
    return updatedStoretId;
  }

  async deleteStore({ storeId }) {
    const deletedStoreId = await this.mongoDB.delete(this.collection, storeId);
    return deletedStoreId;
  }
}

module.exports = StoresServices;