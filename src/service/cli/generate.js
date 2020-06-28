'use strict';

const fs = require(`fs`);

const {getRandomInt, shuffle, getPublishDate} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const DescriptionCount = {
  MIN: 1,
  MAX: 5
};
const MAX_COUNT_OFFERS = 1000;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, titles, sentences, categories) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(DescriptionCount.MIN, DescriptionCount.MAX).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(0, sentences.length - 1)).join(` `),
    createdDate: getPublishDate(),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {

    const [count] = args;

    if (count > MAX_COUNT_OFFERS) {
      console.error(`Не больше 1000 объявлений.`);
      process.exit(ExitCode.FAILURE);
    }

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }
      return console.info(`Operation success. File created.`);
    });
  }
};
