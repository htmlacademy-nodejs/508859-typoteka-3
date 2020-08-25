'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const commentValidator = require(`../middlewares/comment-validator`);
const articleExist = require(`../middlewares/article-exist`);

const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/`, (request, response) => {
    const articles = articleService.findAll();

    if (!articles) {
      return response.status(HttpCode.NOT_FOUND)
        .send(`Not found articles`);
    }

    return response.status(HttpCode.OK)
      .json(articles);
  });

  route.get(`/:articleId`, (request, response) => {
    const {articleId} = request.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return response.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return response.status(HttpCode.OK)
        .json(article);
  });

  route.post(`/`, articleValidator, (request, response) => {
    const article = articleService.create(request.body);

    return response.status(HttpCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, articleValidator, (request, response) => {
    const {articleId} = request.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return response.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    const updatedArticle = articleService.update(articleId, request.body);

    return response.status(HttpCode.OK)
      .json(updatedArticle);
  });

  route.delete(`/:articleId`, (request, response) => {
    const {articleId} = request.params;
    const article = articleService.drop(articleId);

    if (!article) {
      return response.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return response.status(HttpCode.OK)
      .json(article);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), (request, response) => {
    const {article} = response.locals;
    const comments = commentService.findAll(article);

    response.status(HttpCode.OK)
      .json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), (request, response) => {
    const {article} = response.locals;
    const {commentId} = request.params;

    const deletedComment = commentService.drop(article, commentId);

    if (!deletedComment) {
      return response.status(HttpCode.NOT_FOUND)
      .send(`Not found with ${commentId}`);
    }

    return response.status(HttpCode.OK)
      .json(deletedComment);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], (request, response) => {
    const {article} = response.locals;
    const comment = commentService.create(article, request.body);

    return response.status(HttpCode.CREATED)
      .json(comment);
  });
};
