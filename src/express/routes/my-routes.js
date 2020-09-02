'use strict';

const {Router} = require(`express`);

const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {pageContentMy, pageContentMyComments} = require(`../mock`);

const myRouter = new Router();

myRouter.get(`/`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`my/my`, pageContentMy);
});

myRouter.get(`/comments`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`my/comments`, pageContentMyComments);
});

module.exports = myRouter;
