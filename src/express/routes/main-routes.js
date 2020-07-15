'use strict';

const {Router} = require(`express`);
const {pageContentMain, pageContentAllCategories} = require(`../mock`);

const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => {
  res.render(`main`, pageContentMain);
});

mainRouter.get(`/register`, (req, res) => {
  res.render(`auth/sign-up`);
});

mainRouter.get(`/login`, (req, res) => {
  res.render(`auth/login`);
});

mainRouter.get(`/search`, (req, res) => {
  res.render(`search`, {
    isAuth: false
  });
});

mainRouter.get(`/categories`, (req, res) => {
  res.render(`all-categories`, pageContentAllCategories);
});

module.exports = mainRouter;
