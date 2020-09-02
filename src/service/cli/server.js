'use strict';

const chalk = require(`chalk`);

const app = require(`../start-server`);
const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    try {
      app.listen(port, (error) => {
        if (error) {
          logger.error(`server:start Create server error - ${error}`);
          return console.error(`Ошибка при создании сервера`, error);
        }

        logger.info(`server:start Created server on localhost:${port}`);
        return console.info(chalk.green(`Ожидаю соединений на localhost:${port}`));
      });
    } catch (error) {
      logger.error(`server:start Create server error - ${error.message}`);
      console.error(`Произошла ошибка: ${error.message}`);
      process.exit(1);
    }
  }
};
