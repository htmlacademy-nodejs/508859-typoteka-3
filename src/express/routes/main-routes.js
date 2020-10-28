'use strict';

const {Router} = require(`express`);

const {getRequest} = require(`../api`);
const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {
  pageContentAllCategories,
  pageContentRegister,
  pageContentLogin
} = require(`../mock`);

const {adaptMainPage, adaptSearchPage} = require(`../adapters`);

const mainRouter = new Router();

mainRouter.get(`/`, async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  getRequest().get(`/articles`)
    .then((resp) => response.render(`main`, adaptMainPage(resp.data)))
    .catch((error) => logger.error(`client:request End request with error: ${error}`));
});

mainRouter.get(`/register`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`auth/sign-up`, pageContentRegister);
});

mainRouter.get(`/login`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`auth/login`, pageContentLogin);
});

mainRouter.get(`/search`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`search`, adaptSearchPage([]));
});

mainRouter.get(`/search/results`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  const options = {params: request.query};
  getRequest().get(`/search`, options)
    .then((resp) => response.render(`search`, adaptSearchPage(resp.data)))
    .catch((error) => {
      response.render(`search`, adaptSearchPage([]));
      logger.error(`client:request End request with error: ${error}`);
    });
});

mainRouter.get(`/categories`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`all-categories`, pageContentAllCategories);
});

module.exports = mainRouter;
