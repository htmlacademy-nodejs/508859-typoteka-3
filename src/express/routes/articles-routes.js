'use strict';

const {Router} = require(`express`);
const request = require(`request-promise-native`);

const {adaptPostPage, adaptNewPostPage} = require(`../adapters`);
const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {
  // pageContentPost,
  // pageContentNewPost,
  pageContentEditPost,
  pageContentCategory
} = require(`../mock`);

const mainRouter = new Router();

mainRouter.get(`/add`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  res.render(`articles/new-post`, adaptNewPostPage({}));
});

mainRouter.post(`/add`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);

  const options = {
    uri: `http://localhost:3000/api/articles`,
    method: `POST`,
    json: true,
    body: {...req.fields, category: []}, // пока не могу добавлять категории при создании поста
    headers: {
      'Content-Type': `application/json`
    }
  };
  request(options)
    .then(() => res.redirect(`/my`))
    .catch((error) => {
      res.render(`articles/new-post`, adaptNewPostPage(req.fields));
      logger.error(`client:request End request with error: ${error}`);
    });
});

mainRouter.get(`/edit/:id`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  res.render(`articles/new-post`, pageContentEditPost);
});

mainRouter.get(`/category/:id`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  res.render(`articles/articles-by-category`, pageContentCategory);
});

mainRouter.get(`/:id`, (req, res) => {
  logger.info(`client:routes End request with status code ${res.statusCode}`);
  request(`http://localhost:3000/api/articles/${req.params.id}`, {json: true})
    .then((content) => res.render(`articles/post`, adaptPostPage(content)))
    .catch((error) => logger.error(`client:request End request with error: ${error}`));
});

module.exports = mainRouter;
