const joi = require('@hapi/joi');

const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productTitleSchema = joi.string().max(80);
const productImageSchema = joi.string().uri();
const productPriceSchema = joi.number();
const productDescriptionSchema = joi.string().max(300);
const productQuantitySchema = joi.number();
const productCategoriesSchema = joi.array().items(joi.string().max(30));
const productIdStore = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productStoreNameSchema = joi.string().max(50);
const productColorSchema = joi.string().max(50);
const productTallaSchema = joi.string().max(50);

const createProductSchema = {
  title: productTitleSchema.required(),
  image: productImageSchema.required(),
  price: productPriceSchema.required(),
  description: productDescriptionSchema.required(),
  quantity: productQuantitySchema.required(),
  categories: productCategoriesSchema.required(), 
  id_store: productIdStore.required(),
  store_name: productStoreNameSchema.required(),
  color: productColorSchema,
  talla: productTallaSchema
};

const updateProductSchema = {
  title: productTitleSchema,
  image: productImageSchema,
  price: productPriceSchema,
  description: productDescriptionSchema,
  quantity: productQuantitySchema,
  categories: productCategoriesSchema, 
  id_store: productIdStore,
  store_name: productStoreNameSchema,
  color: productColorSchema,
  talla: productTallaSchema
};
