'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const article = require(`./article`);
const DataService = require(`../data-service/article-service`);
const CommentService = require(`../data-service/comment-service`);

const {HttpCode} = require(`../../constants`);

const mockCategories = [`За жизнь`, `Деревья`, `Программирование`];

const mockArticles = [{
  title: `Лучшие рок-музыканты 20-века`,
  createdDate: `2021-04-18T11:46:32.262Z`,
  imagePath: `/img/sea@1x.jpg`,
  announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  fullText: `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  categories: [`За жизнь`],
  comments: [{
    text: `А где блок питания? Почему в таком ужасном состоянии?`,
  },
  {
    text: `А где блок питания? Оплата наличными или перевод на карту? Вы что?! В магазине дешевле. А сколько игр в комплекте?`,
  }]
},
{
  title: `Как начать программировать`,
  createdDate: `2021-04-18T11:46:32.262Z`,
  imagePath: `/img/sea@1x.jpg`,
  announce: `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  fullText: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  categories: [`За жизнь`, `Программирование`],
  comments: [{
    text: `А где блок питания? Почему в таком ужасном состоянии?`,
  }]
},
{
  title: `Учим HTML и CSS`,
  createdDate: `2021-04-18T11:46:32.262Z`,
  imagePath: `/img/sea@1x.jpg`,
  announce: `Простые ежедневные упражнения помогут достичь успеха.`,
  fullText: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  categories: [`Деревья`],
  comments: [{
    text: `А где блок питания? Почему в таком ужасном состоянии?`,
  }]
}];

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {categories: mockCategories, articles: mockArticles, users: []});
  const app = express();
  app.use(express.json());
  article(app, new DataService(mockDB), new CommentService(mockDB));
  return app;
};

describe(`API returns a list of all articles`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/articles`);
  });


  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 3 articles`, () => expect(response.body.articles.length).toBe(3));

  test(`First articles's title equals "Лучшие рок-музыканты 20-века"`, () => expect(response.body.articles[0].title).toBe(`Лучшие рок-музыканты 20-века`));

});

describe(`API returns an article with given id`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/articles/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Лучшие рок-музыканты 20-века"`, () => expect(response.body.title).toBe(`Лучшие рок-музыканты 20-века`));

});

describe(`API creates an offer if data is valid`, () => {
  const newArticle = {
    categories: [1, 2],
    createdDate: new Date(),
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `Дам погладить котика. Дорого. Не гербалайф`,
    imagePath: `cat.jpg`,
  };

  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Articles count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.articles.length).toBe(4))
  );

});

describe(`API refuses to create an article if data is invalid`, () => {

  const newArticle = {
    categories: [1, 2],
    createdDate: new Date(),
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `Дам погладить котика. Дорого. Не гербалайф`,
    imagePath: `cat.jpg`,
  };

  let app;

  beforeAll(async () => {
    app = await createAPI();
  });

  test(`Without any required property response code is 400`, async () => {
    let badArticle;
    for (const key of Object.keys(newArticle)) {
      badArticle = {...newArticle};
      delete badArticle[key];
    }
    delete badArticle.title;
    await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
  });

});

describe(`API changes existent article`, () => {

  const newArticle = {
    categories: [1, 2],
    createdDate: new Date(),
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `Дам погладить котика. Дорого. Не гербалайф`,
    imagePath: `cat.jpg`,
  };

  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .put(`/articles/2`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/2`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});

test(`API returns status code 404 when trying to change non-existent article`, async () => {

  const app = await createAPI();

  const validArticle = {
    categories: [1, 2],
    createdDate: new Date(),
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `Дам погладить котика. Дорого. Не гербалайф`,
    imagePath: `cat.jpg`,
  };

  return request(app)
    .put(`/articles/20`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, async () => {

  const app = await createAPI();

  const invalidArticle = {
    categories: [1, 2],
    createdDate: new Date(),
    title: `Это невалидный`,
    announce: `объект`,
  };

  return request(app)
    .put(`/articles/20`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/articles/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article count is 2 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.articles.length).toBe(2))
  );

});

test(`API refuses to delete non-existent article`, async () => {

  const app = await createAPI();

  return request(app)
    .delete(`/articles/20`)
    .expect(HttpCode.NOT_FOUND);

});

describe(`API returns a list of comments to given article`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/articles/2/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 1 comment`, () => expect(response.body.length).toBe(1));

  test(`First comment's text is "А где блок питания? Почему в таком ужасном состоянии?"`,
      () => expect(response.body[0].text).toBe(`А где блок питания? Почему в таком ужасном состоянии?`));

});


// describe(`API creates a comment if data is valid`, () => {

//   const newComment = {
//     text: `Валидному комментарию достаточно этого поля`
//   };

//   let app;
//   let response;

//   beforeAll(async () => {
//     app = await createAPI();
//     response = await request(app)
//       .post(`/articles/2/comments`)
//       .send(newComment);
//   });


//   test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

//   test(`Comments count is changed`, () => request(app)
//     .get(`/articles/2/comments`)
//     .expect((res) => expect(res.body.length).toBe(2))
//   );

// });

test(`API refuses to create a comment to non-existent article and returns status code 404`, async () => {

  const app = await createAPI();

  return request(app)
    .post(`/articles/20/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {

  const app = await createAPI();

  return request(app)
    .post(`/articles/2/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);

});

// describe(`API correctly deletes a comment`, () => {

//   let app;
//   let response;

//   beforeAll(async () => {
//     app = await createAPI();
//     response = await request(app)
//       .delete(`/articles/1/comments/1`);
//   });

//   test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

//   test(`Comments count is 2 now`, () => request(app)
//     .get(`/articles/1/comments`)
//     .expect((res) => expect(res.body.length).toBe(2))
//   );

// });

test(`API refuses to delete non-existent comment`, async () => {

  const app = await createAPI();

  return request(app)
    .delete(`/articles/3/comments/100`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete a comment to non-existent article`, async () => {

  const app = await createAPI();

  return request(app)
    .delete(`/articles/20/comments/1`)
    .expect(HttpCode.NOT_FOUND);

});
