'use strict';

const FILE_NAME = `mock.json`;
const DEFAULT_PORT = 8080;

const ExitCode = {
  SUCCESS: 0,
  FAILURE: 1
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};


module.exports = {
  FILE_NAME,
  DEFAULT_PORT,
  ExitCode,
  HttpCode
};
