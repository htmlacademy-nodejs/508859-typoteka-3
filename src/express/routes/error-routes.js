'use strict';

const {Router} = require(`express`);

const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const errorRouter = new Router();

errorRouter.get(`/404`, (request, response) => {
  logger.error(`client:routes End request with status code ${response.statusCode}`);
  response.render(`errors/404`);
});

errorRouter.get(`/500`, (request, response) => {
  logger.error(`client:routes End request with status code ${response.statusCode}`);
  response.render(`errors/500`);
});

module.exports = errorRouter;
