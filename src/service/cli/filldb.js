'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const sequelize = require(`../lib/sequelize`);
const initDatabase = require(`../lib/init-db`);
const {
  getRandomInt,
  shuffleElements,
  getRandomSubarray
} = require(`../../utils/utils`);
const {ExitCode} = require(`../../constants`);
const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const DEFAULT_COUNT = 1;
const FILE_TITLES_PATH = `./src/data/titles.txt`;
const FILE_SENTENCES_PATH = `./src/data/sentences.txt`;
const FILE_CATEGORIES_PATH = `./src/data/categories.txt`;
const FILE_COMMENTS_PATH = `./src/data/comments.txt`;
const FILE_EMAIL_USERS_PATH = `./src/data/email_users.txt`;
const FILE_FIRST_USERS_PATH = `./src/data/firstname_users.txt`;
const FILE_LAST_USERS_PATH = `./src/data/lastname_users.txt`;

const images = [
  {previewImg: `/img/skyscraper@1x.jpg`, fullImg: `/img/sea-fullsize@1x.jpg`},
  {previewImg: `/img/forest@1x.jpg`, fullImg: `/img/sea-fullsize@1x.jpg`},
  {previewImg: `/img/sea@1x.jpg`, fullImg: `/img/sea-fullsize@1x.jpg`}
];


const MAX_COUNT_OFFERS = 1000;
const countUser = 5;

const DescriptionCount = {
  MIN: 1,
  MAX: 2
};

const CommentCount = {
  MIN: 1,
  MAX: 10
};

const CommentTextCount = {
  MIN: 0,
  MAX: 5
};

const CategoryCount = {
  MIN: 0,
  MAX: 5
};

const UserIdNumber = {
  MIN: 1,
  MAX: 5
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    logger.info(`file:reader Read file success`);
    return content.split(`\n`).filter((data) => data !== ``);
  } catch (error) {
    logger.error(`file:reader Read file error - ${error}`);
    console.error(chalk.red(error));
    return [];
  }
};

const generateArticles = (count, titles, sentences, randomImage, categories, comments) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffleElements(sentences).slice(DescriptionCount.MIN, DescriptionCount.MAX).join(` `),
    fullText: shuffleElements(sentences).slice(DescriptionCount.MIN, DescriptionCount.MAX).join(` `),
    createdDate: new Date(),
    imagePath: randomImage.previewImg,
    imagePathFull: randomImage.fullImg,
    categories: getRandomSubarray(categories.slice(CategoryCount.MIN, CategoryCount.MAX)),
    comments: generateComments(getRandomInt(CommentCount.MIN, CommentCount.MAX), comments),
    userId: getRandomInt(UserIdNumber.MIN, UserIdNumber.MAX)
  }))
);

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    text: shuffleElements(comments)
      .slice(CommentTextCount.MIN, getRandomInt(CommentTextCount.MIN, CommentTextCount.MAX))
      .join(` `),
    userId: getRandomInt(UserIdNumber.MIN, UserIdNumber.MAX)
  }))
);

const generateUsers = (count, email, firstname, lastname) => (
  Array(count).fill({}).map(() => ({
    email: shuffleElements(email)[0],
    firstname: shuffleElements(firstname)[0],
    lastname: shuffleElements(lastname)[0],
    pass: nanoid(6),
    avatarPath: `/img/avatar-2.png`,
  }))
);

const generateRandomImage = (pathImages) => {
  return shuffleElements(pathImages)[0];
};

module.exports = {
  name: `--filldb`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const titles = await readContent(FILE_TITLES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);
    const emailUsers = await readContent(FILE_EMAIL_USERS_PATH);
    const firstUsers = await readContent(FILE_FIRST_USERS_PATH);
    const lastUsers = await readContent(FILE_LAST_USERS_PATH);

    const randomImage = generateRandomImage(images);

    const [count] = args;

    if (count > MAX_COUNT_OFFERS) {
      console.error(chalk.red(`Не больше 1000 объявлений.`));
      process.exit(ExitCode.FAILURE);
    }

    const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const users = generateUsers(countUser, emailUsers, firstUsers, lastUsers);
    const articles = generateArticles(countArticles, titles, sentences, randomImage, categories, comments);

    return initDatabase(sequelize, {categories, articles, users});
  }
};
