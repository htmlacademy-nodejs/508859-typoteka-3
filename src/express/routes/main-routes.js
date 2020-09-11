'use strict';

const {Router} = require(`express`);
const request = require(`request-promise-native`);

const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {
  pageContentMain,
  pageContentAllCategories,
  pageContentSearch,
  pageContentRegister,
  pageContentLogin
} = require(`../mock`);

const mainAdapter = require(`../adapters/mainAdapter`);

const mainRouter = new Router();

mainRouter.get(`/`, (_request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  request(`http://localhost:3000/api/articles`, {json: true})
    .then((content) => response.render(`main`, mainAdapter(content)))
    .catch((error) => logger.error(`client:request End request with error: ${error}`));
});

mainRouter.get(`/register`, (_request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`auth/sign-up`, pageContentRegister);
});

mainRouter.get(`/login`, (_request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`auth/login`, pageContentLogin);
});

mainRouter.get(`/search`, (_request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`search`, pageContentSearch);
});

mainRouter.get(`/categories`, (_request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`all-categories`, pageContentAllCategories);
});

module.exports = mainRouter;
