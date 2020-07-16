'use strict';

const {Router} = require(`express`);
const {pageContentMy, pageContentMyComments} = require(`../mock`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => {
  res.render(`my/my`, pageContentMy);
});

myRouter.get(`/comments`, (req, res) => {
  res.render(`my/comments`, pageContentMyComments);
});

module.exports = myRouter;
