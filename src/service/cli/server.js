'use strict';

const chalk = require(`chalk`);
const app = require(`../start-server`);

const DEFAULT_PORT = 3000;

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
