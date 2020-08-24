'use strict';

const {Router} = require(`express`);
const errorRouter = new Router();

errorRouter.get(`/404`, (request, response) => {
  response.render(`errors/404`);
});

errorRouter.get(`/500`, (request, response) => {
  response.render(`errors/500`);
});

module.exports = errorRouter;
