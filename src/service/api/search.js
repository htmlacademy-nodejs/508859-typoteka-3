'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../constants`);
const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const route = new Router();

module.exports = (app, searchService) => {
  app.use(`/search`, route);

  route.get(`/`, async (request, response) => {
    const {query} = request.query;

    if (!query) {
      logger.error(`server:api Bad request search query`);
      response.status(HttpCode.BAD_REQUEST).json([]);
      return;
    }

    const searchResults = await searchService.findAll(query);
    const searchStatus = searchResults.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

    logger.info(`server:api Get query search`);
    response.status(searchStatus)
      .json(searchResults);
  });
};
