'use strict';

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const MAX_COUNT_OFFERS = 1000;

const ExitCode = {
  success: 0,
  failure: 1
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  MAX_COUNT_OFFERS,
  ExitCode
};
