'use strict';

const chalk = require(`chalk`);

module.exports = {
  name: `--help`,
  run() {
    const text = `
      Программа запускает http-сервер и формирует файл с данными для API.

      Гайд:
      service.js <command>

      Команды:
      --version:            выводит номер версии
      --help:               печатает этот текст
      --filldb <count>    формирует моковые данные в БД
      --server <port>       запускает http-сервер
    `;

    console.info(chalk.grey(text));
  }
};
