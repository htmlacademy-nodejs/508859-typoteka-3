'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (app, categoryService) => {
  app.use(`/categories`, route);

  route.get(`/`, (request, response) => {
    const categories = categoryService.findAll();
    response.status(HttpCode.OK)
      .json(categories);
  });
};
