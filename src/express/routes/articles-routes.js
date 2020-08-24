'use strict';

const {Router} = require(`express`);
const {pageContentPost, pageContentNewPost, pageContentEditPost, pageContentCategory} = require(`../mock`);

const mainRouter = new Router();

mainRouter.get(`/add`, (request, response) => {
  response.render(`articles/new-post`, pageContentNewPost);
});

mainRouter.get(`/edit/:id`, (request, response) => {
  response.render(`articles/new-post`, pageContentEditPost);
});

mainRouter.get(`/category/:id`, (request, response) => {
  response.render(`articles/articles-by-category`, pageContentCategory);
});

mainRouter.get(`/:id`, (request, response) => {
  response.render(`articles/post`, pageContentPost);
});

module.exports = mainRouter;
