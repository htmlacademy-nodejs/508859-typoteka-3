'use strict';

const {Router} = require(`express`);

const {getRequest} = require(`../api`);
const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {adaptMyPage, adaptMyCommentListPage} = require(`../adapters`);

const myRouter = new Router();

myRouter.get(`/`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  getRequest().get(`/articles`)
    .then((resp) => response.render(`my/my`, adaptMyPage(resp.data)))
    .catch((error) => logger.error(`client:request End request with error: ${error}`));
});

myRouter.get(`/comments`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);

  Promise.all([
    getRequest().get(`/articles/qbJFX5/comments`),
    getRequest().get(`/articles/FotbOO/comments`),
    getRequest().get(`/articles/3-cejA/comments`)
  ])
    .then((resp) => {
      const result = resp.map((item) => item.data);
      response.render(`my/comments`, adaptMyCommentListPage(result.flat()));
    })
    .catch((error) => logger.error(`client:request End request with error: ${error}`));
});

module.exports = myRouter;
