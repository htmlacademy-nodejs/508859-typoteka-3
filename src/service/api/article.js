'use strict';

const {Router} = require(`express`);
const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const commentValidator = require(`../middlewares/comment-validator`);
const articleExist = require(`../middlewares/article-exist`);


const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/all-comments`, async (request, response) => {
    const comments = await commentService.findAllComments();
    logger.info(`server:api Get all comments`);
    response.status(HttpCode.OK)
      .json(comments);
  });

  route.get(`/:articleId`, async (request, response) => {
    const {articleId} = request.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      logger.error(`server:api Not found article with ${articleId}`);
      return response.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    logger.info(`server:api Get article with ${articleId}`);
    return response.status(HttpCode.OK)
      .json(article);
  });

  route.post(`/`, articleValidator, async (request, response) => {

    const article = await articleService.create(request.body);

    logger.info(`server:api Create article`);

    return response.status(HttpCode.CREATED)
      .json(article);
  });

  route.get(`/`, async (request, response) => {
    const {comments} = request.query;
    const articles = await articleService.findAll(comments);

    if (!articles) {
      logger.error(`server:api Not found articles`);
      return response.status(HttpCode.NOT_FOUND)
        .send(`Not found articles`);
    }

    logger.info(`server:api Get articles`);
    return response.status(HttpCode.OK)
      .json({articles, count: articles.length});
  });

  route.put(`/:articleId`, articleValidator, async (request, response) => {
    const {articleId} = request.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      logger.error(`server:api Not found article with ${articleId}`);
      return response.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    const updatedArticle = articleService.update(articleId, request.body);

    logger.info(`server:api Update article with ${articleId}`);
    return response.status(HttpCode.OK)
      .json(updatedArticle);
  });

  route.delete(`/:articleId/delete`, async (request, response) => {
    const {articleId} = request.params;
    const article = await articleService.drop(articleId);

    if (!article) {
      logger.error(`server:api Not found article with ${articleId}`);
      return response.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    logger.info(`server:api Delete article with ${articleId}`);
    return response.status(HttpCode.OK)
      .json(article);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), async (request, response) => {
    const {article} = response.locals;
    const comments = await commentService.findAll(article);

    logger.info(`server:api Get comments article with ${article.id}`);
    response.status(HttpCode.OK)
      .json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), async (request, response) => {
    const {article} = response.locals;
    const {commentId} = request.params;

    const deletedComment = await commentService.drop(commentId);

    if (!deletedComment) {
      logger.error(`server:api Not found comment with ${commentId} (article ${article.id})`);
      return response.status(HttpCode.NOT_FOUND)
      .send(`Not found with ${commentId}`);
    }

    logger.info(`server:api Delete comment article with ${article.id}`);
    return response.status(HttpCode.OK)
      .json(deletedComment);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], async (request, response) => {
    const {article} = response.locals;
    const comment = await commentService.create(article.id, request.body);

    logger.info(`server:api Create comment article with ${article.id}`);
    return response.status(HttpCode.CREATED)
      .json(comment);
  });
};
