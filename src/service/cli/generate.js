'use strict';

const fs = require(`fs`);

const {getRandomInt, shuffle, getPublishDate} = require(`../../utils`);
const {CATEGORIES, SENTENCES, TITLES, DEFAULT_COUNT, FILE_NAME, DescriptionCount} = require(`../../mocks`);
const {MAX_COUNT_OFFERS, ExitCode} = require(`../../constants`);

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(SENTENCES).slice(DescriptionCount.min, DescriptionCount.max).join(` `),
    fullText: shuffle(SENTENCES).slice(0, getRandomInt(0, SENTENCES.length - 1)).join(` `),
    createdDate: getPublishDate(),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1)),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;

    if (count > MAX_COUNT_OFFERS) {
      console.error(`Не больше 1000 объявлений.`);
      process.exit(ExitCode.failure);
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
