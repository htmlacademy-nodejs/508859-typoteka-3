'use strict';

const debug = require(`debug`)(`file-reader`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const readFile = promisify(fs.readFile);
const formatError = (error) => (error && error.message) || ``;

const read = (name) => {
  debug(`reading is started`, name);
  return readFile(name)
      .then((content) => {
        debug(`reading is finished`, name);
        return content;
      })
      .catch((error) => {
        const formatedError = formatError(error);

        debug(`error is occured during the reading`, formatedError);
        return formatedError;
      });
};

module.exports = {
  read
};
