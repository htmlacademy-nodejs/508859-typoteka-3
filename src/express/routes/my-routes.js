'use strict';

const {Router} = require(`express`);
const datefns = require(`date-fns`);

const api = require(`../api`).getAPI();
const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {adaptMyCommentListPage} = require(`../adapters`);

const myRouter = new Router();

myRouter.get(`/`, async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  try {
    const articles = await api.getArticles();
    const myArticleData = {
      page: `my`,
      isAuth: true,
      title: `Типотека`,
      articles: articles.articles.map((article) => ({...article, createdDate: datefns.format(new Date(article.createdDate), `dd.MM.yyyy, HH:mm`)}))
    };
    response.render(`my/my`, myArticleData);
  } catch (error) {
    logger.error(`client:request End request with error: ${error}`);
  }
});

myRouter.get(`/comments`, async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  try {
    const articles = await api.getArticles({comments: true});
    response.render(`comments`, {articles: adaptMyCommentListPage(articles.slice(0, 3))});
  } catch (error) {
    logger.error(`client:request End request with error: ${error}`);
  }
});

module.exports = myRouter;
