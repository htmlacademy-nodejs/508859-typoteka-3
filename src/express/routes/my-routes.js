'use strict';

const {Router} = require(`express`);
const request = require(`request-promise-native`);

const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {getMyAdapter, getMyCommentsAdapter} = require(`../adapters`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  request(`http://localhost:3000/api/articles`, {json: true})
    .then((content) => res.render(`my/my`, getMyAdapter(content)))
    .catch((error) => logger.error(`client:request End request with error: ${error}`));
});

myRouter.get(`/comments`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  request(`http://localhost:3000/api/articles/qbJFX5/comments`, {json: true})
    .then((content) => res.render(`my/comments`, getMyCommentsAdapter(content)))
    .catch((error) => logger.error(`client:request End request with error: ${error}`));
});

module.exports = myRouter;
