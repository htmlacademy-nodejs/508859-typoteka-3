'use strict';

const express = require(`express`);

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const articlesRoutes = require(`./routes/articles-routes`);
const {DEFAULT_PORT} = require(`../constants`);

const app = express();

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.listen(DEFAULT_PORT, () => {
  console.log(`App listening at http://localhost:${DEFAULT_PORT}`);
});
