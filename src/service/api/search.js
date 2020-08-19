'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (app, searchService) => {
  app.use(`/search`, route);

  route.get(`/`, (request, response) => {

    const {query} = request.query;

    if (!query) {
      response.status(HttpCode.BAD_REQUEST).json([]);
      return;
    }

    const searchResults = searchService.findAll(query);
    const searchStatus = searchResults.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

    response.status(searchStatus)
      .json(searchResults);
  });
};
