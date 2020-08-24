'use strict';

const {Router} = require(`express`);
const {pageContentMy, pageContentMyComments} = require(`../mock`);

const myRouter = new Router();

myRouter.get(`/`, (request, response) => {
  response.render(`my/my`, pageContentMy);
});

myRouter.get(`/comments`, (request, response) => {
  response.render(`my/comments`, pageContentMyComments);
});

module.exports = myRouter;
