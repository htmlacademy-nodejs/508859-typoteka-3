'use strict';

const {Router} = require(`express`);
const {pageContentPost, pageContentNewPost, pageContentEditPost, pageContentCategory} = require(`../mock`);

const mainRouter = new Router();

mainRouter.get(`/add`, (req, res) => {
  res.render(`articles/new-post`, pageContentNewPost);
});

mainRouter.get(`/edit/:id`, (req, res) => {
  res.render(`articles/new-post`, pageContentEditPost);
});

mainRouter.get(`/category/:id`, (req, res) => {
  res.render(`articles/articles-by-category`, pageContentCategory);
});

mainRouter.get(`/:id`, (req, res) => {
  res.render(`articles/post`, pageContentPost);
});

module.exports = mainRouter;