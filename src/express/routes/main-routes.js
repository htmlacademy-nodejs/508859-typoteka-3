'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {
  pageContentAllCategories,
  pageContentRegister,
  pageContentLogin
} = require(`../mock`);

const {
  // adaptMainPage,
  adaptSearchPage
} = require(`../adapters`);

const ARTICLES_PER_PAGE = 8;

const mainRouter = new Router();


mainRouter.get(`/`, async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  try {
    let {page = 1} = request.query;
    page = +page;
    const limit = ARTICLES_PER_PAGE;
    const offset = (page - 1) * ARTICLES_PER_PAGE;
    const [
      {count, articles},
      categories
    ] = await Promise.all([
      api.getArticles({limit, offset, comments: true}),
      api.getCategories(true)
    ]);
    const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);
    // adaptMainPage(articles)
    const comments = articles.map((article) => article.comments).flat();
    const lastComments = comments.filter((comment) => comment.createdAt).sort((prev, next) => next - prev).slice(0, 4);
    const mainData = {
      isAuth: true,
      title: `Типотека`,
      renderPage: `main`,
      articles,
      page,
      totalPages,
      categories,
      discussedList: articles.slice(0, 4),
      commentList: lastComments,
    };
    response.render(`main`, mainData);
  } catch (error) {
    logger.error(`client:request End request with error: ${error}`);
  }
});

mainRouter.get(`/register`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`auth/sign-up`, pageContentRegister);
});

mainRouter.get(`/login`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`auth/login`, pageContentLogin);
});

mainRouter.get(`/search`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`search`, adaptSearchPage([]));
});

mainRouter.get(`/search/results`, async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  try {
    const {search} = request.query;
    const results = await api.search(search);
    response.render(`search`, {results: adaptSearchPage(results)});
  } catch (error) {
    response.render(`search`, {results: adaptSearchPage([])});
    logger.error(`client:request End request with error: ${error}`);
  }
});

mainRouter.get(`/categories`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`all-categories`, pageContentAllCategories);
});

module.exports = mainRouter;
