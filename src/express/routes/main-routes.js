'use strict';

const {Router} = require(`express`);

const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {
  pageContentMain,
  pageContentAllCategories,
  pageContentSearch,
  pageContentRegister,
  pageContentLogin
} = require(`../mock`);

const mainRouter = new Router();

mainRouter.get(`/`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`main`, pageContentMain);
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
  response.render(`search`, pageContentSearch);
});

mainRouter.get(`/categories`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`all-categories`, pageContentAllCategories);
});

module.exports = mainRouter;
