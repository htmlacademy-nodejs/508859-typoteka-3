'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {getRandomInt, shuffleElements, getPublishDate} = require(`../../utils`);
const {FILE_NAME, MAX_ID_LENGTH, ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const FILE_TITLES_PATH = `./src/data/titles.txt`;
const FILE_SENTENCES_PATH = `./src/data/sentences.txt`;
const FILE_CATEGORIES_PATH = `./src/data/categories.txt`;
const FILE_COMMENTS_PATH = `./src/data/comments.txt`;

const MAX_COUNT_OFFERS = 1000;

const DescriptionCount = {
  MIN: 1,
  MAX: 5
};

const CommentCount = {
  MIN: 1,
  MAX: 10
};

const CommentTextCount = {
  MIN: 1,
  MAX: 5
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`).filter((data) => data !== ``);
  } catch (error) {
    console.error(chalk.red(error));
    return [];
  }
};

const generateOffers = (count, titles, sentences, categories, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffleElements(sentences).slice(DescriptionCount.MIN, DescriptionCount.MAX).join(` `),
    fullText: shuffleElements(sentences).slice(0, getRandomInt(0, sentences.length - 1)).join(` `),
    createdDate: getPublishDate(),
    category: shuffleElements(categories).slice(0, getRandomInt(1, categories.length - 1)),
    comments: generateComments(getRandomInt(CommentCount.MIN, CommentCount.MAX), comments),
  }))
);

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffleElements(comments)
      .slice(CommentTextCount.MIN, CommentTextCount.MAX)
      .join(` `),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const titles = await readContent(FILE_TITLES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const [count] = args;

    if (count > MAX_COUNT_OFFERS) {
      console.error(chalk.red(`Не больше 1000 объявлений.`));
      process.exit(ExitCode.FAILURE);
    }

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer, titles, sentences, categories, comments));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (error) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
