'use strict';

const {Router} = require(`express`);
const {
  pageContentMain,
  pageContentAllCategories,
  pageContentSearch,
  pageContentRegister,
  pageContentLogin
} = require(`../mock`);

const mainRouter = new Router();

mainRouter.get(`/`, (request, response) => {
  response.render(`main`, pageContentMain);
});

mainRouter.get(`/register`, (request, response) => {
  response.render(`auth/sign-up`, pageContentRegister);
});

mainRouter.get(`/login`, (request, response) => {
  response.render(`auth/login`, pageContentLogin);
});

mainRouter.get(`/search`, (request, response) => {
  response.render(`search`, pageContentSearch);
});

mainRouter.get(`/categories`, (request, response) => {
  response.render(`all-categories`, pageContentAllCategories);
});

module.exports = mainRouter;
