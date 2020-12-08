'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {ExitCode} = require(`../../constants`);
const {categories, users, articles, comments, articlesCategories} = require(`../mocks/mock-fill-db`);
const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const MAX_COUNT_PUBLICATIONS = 10;
const FILL_DB_PATH = `./fill-db-generate.sql`;

const DEFAULT_COUNT = 1;

const getSQLRequest = (list, name) => {
  const listItemString = list.map((item) => `(${Object.values(item).join(`, `)})`).join(`, `);
  return `INSERT INTO ${name} (${Object.keys(list[0]).join(`, `)}) VALUES ${listItemString}; `;
};

const generateSQLContent = (count) => {
  const categoryList = getSQLRequest(categories.slice(0, count), `categories`);
  const userList = getSQLRequest(users.slice(0, count), `users`);
  const articleList = getSQLRequest(articles.slice(0, count), `articles`);
  const commentList = getSQLRequest(comments.slice(0, count), `comments`);
  const articlesCategoryList = getSQLRequest(articlesCategories.slice(0, count), `articles_categories`);

  return [categoryList, userList, articleList, commentList, articlesCategoryList].join(` `);
};

module.exports = {
  name: `--fill`,
  async run(args) {
    const [count] = args;

    if (count > MAX_COUNT_PUBLICATIONS) {
      console.error(chalk.red(`Не больше ${MAX_COUNT_PUBLICATIONS} объявлений для публикаций.`));
      process.exit(ExitCode.FAILURE);
    }

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateSQLContent(countOffer));

    try {
      await fs.writeFile(FILL_DB_PATH, content);
      logger.info(`file:reader File created`);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (error) {
      logger.error(`file:reader Can't write data to file - ${error}`);
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
