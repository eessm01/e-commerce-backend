const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');

const { config } = require('../config/index');

const { createUserSchema } = require('../utils/schemas/users');

// basic strategy
require('../utils/auth/strategies/basic');

const authApi = app =>  {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const userService = new UsersService();

  // sign-in
  router.post(
    '/sign-in',
    async (req, res, next) => {
      const { apiKeyToken } = req.body;      

      if(!apiKeyToken) {
        next(boom.unauthorized('apiKeyToken is required'), false);
      }

      passport.authenticate('basic', (err, user) => {
        try {
          if (err || !user) {
            next(boom.unauthorized(), false);
          }

          req.login(user, { session: false}, async (error) => {
            if(error) {
              next(error);
            }

            const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });            

            if(!apiKey) {
              next(boom.unauthorized());
            }

            const {
              _id: id,
              name,
              email
            } = user;

            const payload = {
              sub: id,
              name, 
              email,
              scopes: apiKey.scopes
            }

            const token = jwt.sign(payload, config.authJwtSecret, { expiresIn: '15m' });

            return res.status(200).json({ token, user: {id, name, email }});
          })
        } catch(err){
          next(err);
        }
      })(req, res, next);
    });


  // sign-up
  router.post(
    '/sign-up',
    validationHandler(joi.object(createUserSchema)),
    async (req, res, next) => {
      const { body: user } = req;

      try {
        const createUserId = await userService.createUser({ user });

        res.status(201).json({
         data: createUserId,
          message: 'user created'
        });
      } catch(err) {
        next(err);
      }
    }
  );

}

module.exports = authApi;