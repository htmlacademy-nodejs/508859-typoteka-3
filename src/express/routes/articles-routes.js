'use strict';

const {Router} = require(`express`);
const fs = require(`fs`).promises;
const multer = require(`multer`);

const upload = multer({dest: `tmp/`});

const {getRequest} = require(`../api`);
const {adaptPostPage, adaptNewPostPage} = require(`../adapters`);
const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

const {
  pageContentEditPost,
  pageContentCategory
} = require(`../mock`);

const mainRouter = new Router();

mainRouter.get(`/add`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`articles/new-post`, adaptNewPostPage({}));
});

mainRouter.post(`/add`, upload.single(`photo`), async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);

  const {mimetype, originalname, size, path} = request.file;
  const allowTypes = [`image/jpeg`, `image/png`];

  if (size === 0 || !allowTypes.includes(mimetype)) {
    fs.unlink(path);
    return response.render(`articles/new-post`, adaptNewPostPage(request.body));
  }

  try {
    await fs.rename(path, `./src/express/photos/${originalname}`);
  } catch (error) {
    logger.error(`client:request End request with error: ${error}`);
  }

  const data = {
    ...request.body,
    category: []
  };

  const headers = {
    'Content-Type': `application/json`
  };

  return getRequest().post(`/articles`, data, {headers})
    .then(() => {
      response.redirect(`/my`);
    })
    .catch((error) => {
      response.render(`articles/new-post`, adaptNewPostPage(request.body));
      logger.error(`client:request End request with error: ${error}`);
    });
});

mainRouter.get(`/edit/:id`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`articles/new-post`, pageContentEditPost);
});

mainRouter.get(`/category/:id`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  response.render(`articles/articles-by-category`, pageContentCategory);
});

mainRouter.get(`/:id`, (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  getRequest().get(`/articles/${request.params.id}`)
    .then((resp) => response.render(`articles/post`, adaptPostPage(resp.data)))
    .catch((error) => logger.error(`client:request End request with error: ${error}`));
});

module.exports = mainRouter;
