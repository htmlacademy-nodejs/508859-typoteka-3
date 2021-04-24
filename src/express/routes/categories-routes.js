'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const categoryRouter = new Router();

categoryRouter.get(`/`, async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  const categories = await api.getCategories();
  const updatedCategories = categories.sort((prev, curr) => +new Date(curr.updatedAt) - +new Date(prev.updatedAt));
  const categoryData = {
    page: `all-categories`,
    isAuth: true,
    categories: updatedCategories
  };
  response.render(`all-categories`, categoryData);
});

categoryRouter.post(`/add`, async (request, response) => {

  logger.info(`client:routes End request with status code ${response.statusCode}`);
  const {body} = request;

  if (!body.name) {
    response.redirect(`/categories`);
  }

  const data = {
    name: body.name,
  };

  try {
    await api.createCategory(data);
    response.redirect(`/categories`);
  } catch (error) {
    response.redirect(`back`);
    logger.error(`client:request End request with error: ${error}`);
  }
});

categoryRouter.post(`/:id/delete`, async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  const {id} = request.params;

  try {
    await api.deleteCategory(id);
    await response.redirect(`/categories`);
  } catch (error) {
    response.redirect(`back`);
    logger.error(`client:request End request with error: ${error}`);
  }
});

categoryRouter.post(`/:id/edit`, async (request, response) => {

  logger.info(`client:routes End request with status code ${response.statusCode}`);
  const {body, params} = request;

  if (!body.name) {
    response.redirect(`/categories`);
  }

  const data = {
    name: body.name,
  };

  try {
    await api.updateCategory(data, params.id);
    response.redirect(`/categories`);
  } catch (error) {
    response.redirect(`back`);
    logger.error(`client:request End request with error: ${error}`);
  }
});

module.exports = categoryRouter;
