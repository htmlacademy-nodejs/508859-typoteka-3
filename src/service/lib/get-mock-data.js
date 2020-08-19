'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {FILE_NAME} = require(`../../constants`);
let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME);
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error(chalk.red(error));
    return Promise.reject(error);
  }

  return Promise.resolve(data);
};

module.exports = getMockData;
