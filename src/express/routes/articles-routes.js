'use strict';

const {Router} = require(`express`);

const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {
  pageContentPost,
  pageContentNewPost,
  pageContentEditPost,
  pageContentCategory
} = require(`../mock`);

const mainRouter = new Router();

mainRouter.get(`/add`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`articles/new-post`, pageContentNewPost);
});

mainRouter.get(`/edit/:id`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`articles/new-post`, pageContentEditPost);
});

mainRouter.get(`/category/:id`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`articles/articles-by-category`, pageContentCategory);
});

mainRouter.get(`/:id`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`articles/post`, pageContentPost);
});

module.exports = mainRouter;
