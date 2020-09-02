'use strict';

const debug = require(`debug`);

const log = debug(`app:start-request`);

const middleware = (request, response, next) => {
  log(`Start request to url ${request.url}`);
  next();
};

module.exports = middleware;
