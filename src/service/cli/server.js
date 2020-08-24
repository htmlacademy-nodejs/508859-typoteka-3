'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const express = require(`express`);

const routes = require(`../api`);
const {FILE_NAME, API_PREFIX, HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;

const app = express();
app.use(express.json());
app.use(API_PREFIX, routes);

let fileContent;

fs.access(`./${FILE_NAME}`)
  .then(async () => {
    fileContent = await fs.readFile(`./${FILE_NAME}`);
  })
  .catch(async () => {
    fileContent = JSON.stringify([]);
    await fs.writeFile(`./${FILE_NAME}`, fileContent);
  });

app.use((request, response) => response
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    try {
      app.listen(port, (error) => {
        if (error) {
          return console.error(`Ошибка при создании сервера`, error);
        }

        return console.info(chalk.green(`Ожидаю соединений на ${port}`));
      });
    } catch (error) {
      console.error(`Произошла ошибка: ${error.message}`);
      process.exit(1);
    }
  }
};
