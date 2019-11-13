const productsMock = [
  {
    "id": "1",
    "image": "https://arepa.s3.amazonaws.com/camiseta.png",
    "title": "Camiseta",
    "price": 25,
    "description": "bla bla bla bla bla", 
    "quantity": 1,
    "categories": [
      {"title": "camiseta"},
      {"title": "ropa dama"}
    ],
    "id_store": "1",
    "store_name": "Diseños Gaby"
  },
  {
    "id": "3",
    "image": "https://arepa.s3.amazonaws.com/mug.png",
    "title": "Taza",
    "price": 10,
    "description": "bla bla bla bla bla",
    "quantity": 3,
    "categories": [
      {"title": "taza"},
      {"title": "accesorios"}
    ],
    "id_store": "2",
    "store_name": "Luis y Lu"
  },
  {
    "id": "4",
    "image": "https://arepa.s3.amazonaws.com/pin.png",
    "title": "Pin",
    "price": 4,
    "description": "bla bla bla bla bla",
    "quantity": 100,
    "categories": [
      {"title": "accesorios"}
    ],
    "id_store": "1",
    "store_name": "Diseños Gaby"
  },
  {
    "id": "5",
    "image": "https://arepa.s3.amazonaws.com/stickers1.png",
    "title": "Stickers",
    "price": 2,
    "description": "bla bla bla bla bla",
    "quantity": 200,
    "categories": [
      {"title": "accesorios"}
    ],
    "id_store": "1",
    "store_name": "Diseños Gaby"
  },
  {
    "id": "6",
    "image": "https://arepa.s3.amazonaws.com/stickers2.png",
    "title": "Stickers",
    "price": 2,
    "description": "bla bla bla bla bla",
    "quantity": 70,
    "categories": [
      {"title": "accesorios"}
    ],
    "id_store": "1",
    "store_name": "Diseños Gaby"
  },
  {
    "id": "7",
    "image": "https://arepa.s3.amazonaws.com/hoodie.png",
    "title": "Capucha",
    "price": 35,
    "description": "bla bla bla bla bla",
    "quantity": 12,
    "categories": [
      {"title": "capucha"},
      {"title": "accesorios"}
    ],
    "id_store": "1",
    "store_name": "Diseños Gaby"
  },
];

function filteredProductsMock(tag) {
  return productsMock.filter(product => product.tags.includes(tag));
}

class ProductsServiceMock {
  async getProducts() {
    return Promise.resolve(productsMock);
  }
}

module.exports = {
  productsMock,
  filteredProductsMock,
  ProductsServiceMock
};
