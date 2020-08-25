'use strict';

const express = require(`express`);

const routes = require(`./api`);
const {API_PREFIX, HttpCode} = require(`../constants`);

const app = express();
app.use(express.json());
app.use(API_PREFIX, routes);

app.use((request, response) => response
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = app;
