'use strict';

const {Router} = require(`express`);
const request = require(`request-promise-native`);

const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {adaptMyPage, adaptMyCommentListPage} = require(`../adapters`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  request(`http://localhost:3000/api/articles`, {json: true})
    .then((content) => res.render(`my/my`, adaptMyPage(content)))
    .catch((error) => logger.error(`client:request End request with error: ${error}`));
});

myRouter.get(`/comments`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  request(`http://localhost:3000/api/articles/qbJFX5/comments`, {json: true})
    .then((content) => res.render(`my/comments`, adaptMyCommentListPage(content.slice(0, 3))))
    .catch((error) => logger.error(`client:request End request with error: ${error}`));
});

module.exports = myRouter;
