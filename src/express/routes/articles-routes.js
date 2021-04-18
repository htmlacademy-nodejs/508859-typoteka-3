'use strict';

const {Router} = require(`express`);
const fs = require(`fs`).promises;
// const path = require(`path`);
const multer = require(`multer`);
const datefns = require(`date-fns`);

const upload = multer({dest: `tmp/`});

// const UPLOAD_DIR = `../upload/img/`;

// const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const api = require(`../api`).getAPI();
// const {adaptPostPage, adaptNewPostPage} = require(`../adapters`);
const {getLogger} = require(`../../utils/logger`);
const logger = getLogger();

// const {
//   pageContentEditPost,
//   pageContentCategory
// } = require(`../mock`);

const mainRouter = new Router();

// const storage = multer.diskStorage({
//   destination: uploadDirAbsolute,
//   filename: (req, file, cb) => {
//     const uniqueName = nanoid(10);
//     const extension = file.originalname.split(`.`).pop();
//     cb(null, `${uniqueName}.${extension}`);
//   }
// });

// const upload = multer({storage});

mainRouter.get(`/add`, async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  try {
    const categories = await api.getCategories();
    // adaptNewPostPage({})
    response.render(`articles/new-post`, {categories});
  } catch (error) {
    logger.info(`client:request End request with error: ${error}`);
  }
});

mainRouter.post(`/add`, upload.single(`photo`), async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  const {body, file} = request;
  const {mimetype, originalname, size, path} = file;
  const allowTypes = [`image/jpeg`, `image/png`];

  if (size === 0 || !allowTypes.includes(mimetype)) {
    fs.unlink(path);
    response.redirect(`back`);
    // return response.render(`articles/new-post`, adaptNewPostPage(body));
  }

  try {
    await fs.rename(path, `./src/express/photos/${originalname}`);
  } catch (error) {
    logger.error(`client:request End request with error: ${error}`);
  }

  const data = {
    ...body,
    category: body.category,
  };

  // const headers = {
  //   'Content-Type': `application/json`
  // };

  try {
    await api.createOffer(data);
    response.redirect(`/my`);
  } catch (error) {
    response.redirect(`back`);
    // response.render(`articles/new-post`, adaptNewPostPage(request.body));
    logger.error(`client:request End request with error: ${error}`);
  }

  // return getRequest().post(`/articles`, data, {headers})
  //   .then(() => {
  //     response.redirect(`/my`);
  //   })
  //   .catch((error) => {
  //     response.render(`articles/new-post`, adaptNewPostPage(request.body));
  //     logger.error(`client:request End request with error: ${error}`);
  //   });
});

mainRouter.get(`/edit/:id`, async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  try {
    const {id} = request.params;
    const [article, categories] = await Promise.all([
      api.getArticle(id),
      api.getCategories()
    ]);
    response.render(`articles/new-post`, {article, categories});
    // response.render(`articles/new-post`, pageContentEditPost);
  } catch (error) {
    logger.error(`client:request End request with error: ${error}`);
  }
});

mainRouter.get(`/categories/:id`, async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  try {
    const {id} = request.params;
    const [articles, categories] = await Promise.all([
      api.getArticles(),
      api.getCategories(true)
    ]);
    const updatedActicles = articles.articles.filter((article) => article.categories.some((category) => category.id === Number(id)));
    const category = categories.find((categoryItem) => categoryItem.id === Number(id));
    const updatedCategories = categories.map((categoryElem) => {
      if (categoryElem.name === category.name) {
        categoryElem.isActive = true;
      }
      return categoryElem;
    });
    const articlesByCategory = {
      pageRender: `articles-by-category`,
      isAuth: true,
      title: `Публикации по категориям`,
      categoryTitle: category.name,
      articles: updatedActicles,
      categories: updatedCategories,
    };
    response.render(`articles/articles-by-category`, articlesByCategory);
  } catch (error) {
    logger.error(`client:request End request with error: ${error}`);
  }
});

mainRouter.get(`/:id`, async (request, response) => {
  logger.info(`client:routes End request with status code ${response.statusCode}`);
  try {
    const {id} = request.params;
    // const article = await api.getArticle(id);

    const [
      article,
      comments
    ] = await Promise.all([
      api.getArticle(id),
      api.getArticleComments(id)
    ]);

    const articleData = {
      renderPage: `post`,
      title: article.title,
      isAuth: true,
      article: {
        ...article,
        createdDate: datefns.format(new Date(article.createdDate), `dd.MM.yyyy, HH:mm`)
      },
      comments: comments.map((comment) => ({...comment, users: {...comment.users, name: `${comment.users.firstname} ${comment.users.lastname}`}, createdAt: datefns.format(new Date(comment.createdAt), `dd.MM.yyyy, HH:mm`)})),
      categories: article.categories
    };
    // adaptPostPage(resp.data)
    response.render(`articles/post`, articleData);
  } catch (error) {
    logger.error(`client:request End request with error: ${error}`);
  }
});

module.exports = mainRouter;
