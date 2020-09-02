'use strict';

const path = require(`path`);
const express = require(`express`);

const {getLogger} = require(`../utils/logger`);
const logger = getLogger();

const pino = require(`express-pino-logger`)({logger});
const startRequest = require(`../utils/start-request`);

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const articlesRoutes = require(`./routes/articles-routes`);
const errorRoutes = require(`./routes/error-routes`);
const {DEFAULT_PORT} = require(`../constants`);

const PUBLIC_DIR = `public`;

const app = express();

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(pino);
app.use(startRequest);

app.use((request, response, next) => {
  logger.debug(`Start request to url ${request.url}`);
  next();
});

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/error`, errorRoutes);

app.use((request, response) => {
  response.status(404).render(`errors/404`);
  logger.error(`End request with error ${response.statusCode}`);
});

app.listen(DEFAULT_PORT, () => {
  logger.info(`App listening at http://localhost:${DEFAULT_PORT}`);
})
.on(`error`, (error) => {
  logger.error(`Server can't start. Error: ${error}`);
});
