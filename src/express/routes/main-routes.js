'use strict';

const {Router} = require(`express`);
const request = require(`request-promise-native`);

const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {
  pageContentAllCategories,
  // pageContentSearch,
  pageContentRegister,
  pageContentLogin
} = require(`../mock`);

const {adaptMainPage, adaptSearchPage} = require(`../adapters`);

const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  request(`http://localhost:3000/api/articles`, {json: true})
    .then((content) => res.render(`main`, adaptMainPage(content)))
    .catch((error) => logger.error(`client:request End request with error: ${error}`));
});

mainRouter.get(`/register`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  res.render(`auth/sign-up`, pageContentRegister);
});

mainRouter.get(`/login`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  res.render(`auth/login`, pageContentLogin);
});

mainRouter.get(`/search`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  res.render(`search`, adaptSearchPage([]));
});

mainRouter.get(`/search/results`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  const options = {
    uri: `http://localhost:3000/api/search?query=${req.query}`,
    json: true,
    qs: req.query,
    headers: {
      'Content-Type': `application/json`
    }
  };
  request(options)
    .then((content) => res.render(`search`, adaptSearchPage(content)))
    .catch((error) => {
      res.render(`search`, adaptSearchPage([]));
      logger.error(`client:request End request with error: ${error}`);
    });
});

mainRouter.get(`/categories`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  res.render(`all-categories`, pageContentAllCategories);
});

module.exports = mainRouter;
