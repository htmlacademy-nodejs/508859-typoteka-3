'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../constants`);
const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();


const route = new Router();

module.exports = (app, categoryService) => {
  app.use(`/categories`, route);

  route.get(`/`, async (request, response) => {
    const {count} = request.query;
    const categories = await categoryService.findAll(count);

    logger.info(`server:api Get categories`);
    response.status(HttpCode.OK)
      .json(categories);
  });
};
