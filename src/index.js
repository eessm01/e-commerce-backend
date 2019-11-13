const express = require('express');
const app = express();

const { config } = require('./config');
const platziStore = require('./routes/products')

app.get('/', (req, res) => {
  let userInfo = req.header("user-agent");
  res.send(`UserInfo: ${userInfo}`);
});

const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// middleware body parser
app.use(express.json());

// routes
platziStore(app);

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