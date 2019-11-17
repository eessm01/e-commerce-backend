const express = require('express');
const app = express();

const { config } = require('./config');

const eMomsProductsApi = require('./routes/products');
const eMomsStoresApi = require('./routes/stores');
const shoppinCartApi = require('./routes/shoppingCart');
const authApi = require('./routes/auth');

const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// middleware body parser
app.use(express.json());

// middleware - Enable All CORS Requests
app.use(cors())


// routes
authApi(app);
eMomsProductsApi(app);
eMomsStoresApi(app);
shoppinCartApi(app);

// always go to the end
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// Catch 404
app.use(notFoundHandler);

app.listen(config.port, err => {
  if (err) {
    console.error("Error: ", err);
    return;
  }
  console.log(`Listening http://localhost:${config.port}`);
});