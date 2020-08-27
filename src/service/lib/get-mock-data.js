'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {FILE_NAME} = require(`../../constants`);
const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

let data = null;
let fileData;

fs.access(`./${FILE_NAME}`)
  .then(async () => {
    fileData = await fs.readFile(`./${FILE_NAME}`);
  })
  .catch(async () => {
    fileData = JSON.stringify([]);
    await fs.writeFile(`./${FILE_NAME}`, fileData);
  });

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME);
    data = JSON.parse(fileContent);
    logger.info(`file:reader Read file success`);
  } catch (error) {
    logger.error(`file:reader Read file error - ${error}`);
    console.error(chalk.red(error));
    return Promise.reject(error);
  }

  return Promise.resolve(data);
};

module.exports = getMockData;
