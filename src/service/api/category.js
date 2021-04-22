'use strict';

const {Router} = require(`express`);

const categoryValidator = require(`../middlewares/category-validator`);

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

  route.post(`/`, categoryValidator, async (request, response) => {
    const category = await categoryService.create(request.body);

    logger.info(`server:api Create category`);

    return response.status(HttpCode.CREATED)
      .json(category);
  });

  route.put(`/:categoryId/edit`, categoryValidator, async (request, response) => {
    const {categoryId} = request.params;
    const category = await categoryService.findOne(categoryId);

    if (!category) {
      logger.error(`server:api Not found category with ${categoryId}`);
      return response.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${categoryId}`);
    }

    const updatedCategory = categoryService.update(categoryId, request.body);

    logger.info(`server:api Update article with ${categoryId}`);
    return response.status(HttpCode.OK)
      .json(updatedCategory);
  });

  route.delete(`/:categoryId/delete`, async (request, response) => {
    const {categoryId} = request.params;
    const category = await categoryService.drop(categoryId);

    if (!category) {
      logger.error(`server:api Not found category with ${categoryId}`);
      return response.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${categoryId}`);
    }

    logger.info(`server:api Delete category with ${categoryId}`);
    return response.status(HttpCode.OK)
      .json(category);
  });
};
