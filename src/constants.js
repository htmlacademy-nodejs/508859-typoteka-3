'use strict';

const DEFAULT_PORT = 8080;
const MAX_ID_LENGTH = 6;
const API_PREFIX = `/api`;

const ExitCode = {
  SUCCESS: 0,
  FAILURE: 1
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};


module.exports = {
  DEFAULT_PORT,
  MAX_ID_LENGTH,
  API_PREFIX,
  ExitCode,
  HttpCode
};
