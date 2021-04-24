'use strict';

const {Router} = require(`express`);
const datefns = require(`date-fns`);
const api = require(`../api`).getAPI();

const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

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
      categories,
      comments
    ] = await Promise.all([
      api.getArticles({limit, offset, comments: true}),
      api.getCategories(true),
      api.getAllComments()
    ]);
    const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

    // const comments = articles.map((article) => article.comments).flat();
    const lastComments = comments.filter((comment) => comment.users).sort((prev, next) => +new Date(next.createdAt) - +new Date(prev.createdAt)).slice(0, 4);
    const mainData = {
      isAuth: true,
      title: `Типотека`,
      renderPage: `main`,
      articles: articles.map((article) => ({...article, createdDate: datefns.format(new Date(article.createdAt), `dd.MM.yyyy, HH:mm`)})),
      page,
      totalPages,
      categories,
      discussedList: articles.slice(0, 4),
      commentList: lastComments.map((comment) => ({...comment, users: {...comment.users, name: `${comment.users.firstname} ${comment.users.lastname}`}})),
    };
    response.render(`main`, mainData);
  } catch (error) {
    logger.error(`client:request End request with error: ${error}`);
  }
});

mainRouter.get(`/register`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  const registerData = {
    errorList: [
      // `Пароль не может состоять из двух букв`,
      // `Фамилия не должна быть смешной`
    ],
    errorLogin: {
      errorEmail: false,
      errorPassword: false
    }
  };
  response.render(`auth/sign-up`, registerData);
});

mainRouter.get(`/login`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  const loginData = {
    errorList: [],
    errorLogin: {
      errorEmail: false,
      errorPassword: false
    }
  };
  response.render(`auth/login`, loginData);
});

mainRouter.get(`/search`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`search`, adaptSearchPage([]));
});

mainRouter.get(`/search/results`, async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  try {
    const {query} = request.query;
    const results = await api.search(query);

    const searchData = {
      pageRender: `search`,
      isAuth: true,
      title: `Типотека`,
      searchWord: query,
      searchList: results.map((result) => ({...result, createdDate: datefns.format(new Date(result.createdDate), `dd.MM.yyyy, HH:mm`)}))
    };

    response.render(`search`, searchData);
  } catch (error) {
    const emptySearchData = {
      pageRender: `search`,
      isAuth: true,
      title: `Типотека`,
      searchWord: ``,
      searchList: []
    };
    response.render(`search`, emptySearchData);
    logger.error(`client:request End request with error: ${error}`);
  }
});

module.exports = mainRouter;
