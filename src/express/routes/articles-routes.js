'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/:id`, (req, res) => {
  // res.send(`/articles/${req.params.id}`);
  res.render(`articles/post`);
});

mainRouter.get(`/add`, (req, res) => {
  res.send(`/articles/add`);
});

mainRouter.get(`/edit/:id`, (req, res) => {
  res.send(`/articles/edit/${req.params.id}`);
});

mainRouter.get(`/category/:id`, (req, res) => {
  res.send(`/articles/category/${req.params.id}`);
});

module.exports = mainRouter;
