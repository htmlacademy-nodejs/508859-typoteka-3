'use strict';

const request = require(`supertest`);

const app = require(`../start-server`);
const {HttpCode} = require(`../../constants`);

describe(`get /articles API end-points`, () => {
  test(`When get /articles status code should be 200`, async (done) => {
    const response = await request(app).get(`/api/articles`);
    expect(response.statusCode).toBe(HttpCode.OK);
    done();
  });

  test(`Should had all properties`, async (done) => {
    const response = await request(app).get(`/api/articles/qbJFX5`);
    expect(response.body).toHaveProperty(`id`);
    expect(response.body).toHaveProperty(`title`);
    expect(response.body).toHaveProperty(`announce`);
    expect(response.body).toHaveProperty(`fullText`);
    expect(response.body).toHaveProperty(`createdDate`);
    expect(response.body).toHaveProperty(`category`);
    expect(response.body).toHaveProperty(`comments`);
    done();
  });
});

describe(`get /articles/:articleId API end-points`, () => {
  test(`When get /articles/:articleId status code should be 200`, async (done) => {
    const response = await request(app).get(`/api/articles/qbJFX5`);
    expect(response.statusCode).toBe(HttpCode.OK);
    done();
  });

  test(`Should had all properties`, async (done) => {
    const response = await request(app).get(`/api/articles/qbJFX5`);
    expect(response.body).toHaveProperty(`id`);
    expect(response.body).toHaveProperty(`title`);
    expect(response.body).toHaveProperty(`announce`);
    expect(response.body).toHaveProperty(`fullText`);
    expect(response.body).toHaveProperty(`createdDate`);
    expect(response.body).toHaveProperty(`category`);
    expect(response.body).toHaveProperty(`comments`);
    done();
  });

  test(`Should 404 because article with id doesn't exist`, async (done) => {
    const res = await request(app).get(`/api/articles/qbJFL6`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    done();
  });
});

describe(`post /articles API end-points`, () => {
  test(`When post /articles status code should be 200`, async (done) => {
    const response = await request(app)
      .post(`/api/articles`)
      .send({
        title: `Новый курс по JavaScript`,
        announce: `Курс`,
        fullText: `Первоклассный курс по программированию`,
        createdDate: `2020-05-22 09:20:00`,
        category: [`IT`, `Разное`],
        comments: []
      });

    const id = response.body.id;
    const articleResponse = await request(app)
      .get(`/api/articles/${id}`);
    expect(articleResponse.body.title).toBe(`Новый курс по JavaScript`);
    done();
  });

  test(`Should had all properties`, async (done) => {
    const response = await request(app)
      .post(`/api/articles`)
      .send({
        title: `Новый курс по JavaScript`,
        announce: `Курс`,
        fullText: `Первоклассный курс по программированию`,
        createdDate: `2020-05-22 09:20:00`,
        category: [`IT`, `Разное`],
        comments: []
      });

    const id = response.body.id;
    const articleResponse = await request(app)
      .get(`/api/articles/${id}`);

    expect(articleResponse.body).toHaveProperty(`id`);
    expect(articleResponse.body).toHaveProperty(`title`);
    expect(articleResponse.body).toHaveProperty(`announce`);
    expect(articleResponse.body).toHaveProperty(`fullText`);
    expect(articleResponse.body).toHaveProperty(`createdDate`);
    expect(articleResponse.body).toHaveProperty(`category`);
    expect(articleResponse.body).toHaveProperty(`comments`);
    done();
  });

  test(`Should 400 because title property doesn't exist`, async () => {
    const response = await request(app)
      .post(`/api/articles`)
      .send({name: `Новый курс по JavaScript`});

    expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
});

describe(`put /articles/:articleId API end-points`, () => {
  test(`When put /articles/:articleId status code should be 200`, async (done) => {
    const response = await request(app)
      .put(`/api/articles/qbJFX5`)
      .send({
        title: `Новый курс по JavaScript`,
        announce: `Курс`,
        fullText: `Первоклассный курс по программированию`,
        createdDate: `2020-05-22 09:20:00`,
        category: [`IT`, `Разное`],
        comments: []
      });
    expect(response.statusCode).toBe(HttpCode.OK);
    expect(response.body.title).toBe(`Новый курс по JavaScript`);
    done();
  });

  test(`Should had all properties`, async (done) => {
    const response = await request(app)
      .put(`/api/articles/qbJFX5`)
      .send({
        title: `Новый курс по JavaScript`,
        announce: `Курс`,
        fullText: `Первоклассный курс по программированию`,
        createdDate: `2020-05-22 09:20:00`,
        category: [`IT`, `Разное`],
        comments: []
      });

    expect(response.body).toHaveProperty(`id`);
    expect(response.body).toHaveProperty(`title`);
    expect(response.body).toHaveProperty(`announce`);
    expect(response.body).toHaveProperty(`fullText`);
    expect(response.body).toHaveProperty(`createdDate`);
    expect(response.body).toHaveProperty(`category`);
    expect(response.body).toHaveProperty(`comments`);
    done();
  });

  test(`Should 400 because article with id doesn't exist`, async (done) => {
    const response = await request(app)
    .put(`/api/articles/qbJFAQ`)
    .send({
      title: `Новый курс по JavaScript`,
      announce: `Курс`,
      fullText: `Первоклассный курс по программированию`,
      createdDate: `2020-05-22 09:20:00`,
      category: [`IT`, `Разное`],
      comments: []
    });

    expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    done();
  });
});

describe(`delete /articles/:articleId API end-points`, () => {
  test(`When delete /articles/:articleId status code should be 200`, async (done) => {
    const response = await request(app)
      .delete(`/api/articles/qbJFX5`);

    expect(response.statusCode).toBe(HttpCode.OK);
    done();
  });

  test(`Should 400 because article with id doesn't exist`, async (done) => {
    const response = await request(app)
      .delete(`/api/articles/qbJFFR`);

    expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    done();
  });
});

describe(`get /articles/:articleId/comments API end-points`, () => {
  test(`When get /articles/:articleId/comments status code should be 200`, async (done) => {
    const response = await request(app).get(`/api/articles/FotbOO/comments`);
    expect(response.statusCode).toBe(HttpCode.OK);
    done();
  });
});

describe(`delete /articles/:articleId/comments/:commentId API end-points`, () => {
  test(`When delete /articles/:articleId/comments/:commentId status code should be 200`, async (done) => {
    const response = await request(app).delete(`/api/articles/FotbOO/comments/cT4fqA`);
    expect(response.statusCode).toBe(HttpCode.OK);
    done();
  });

  test(`Should had all properties for comments`, async (done) => {
    const response = await request(app).delete(`/api/articles/FotbOO/comments/cT4frA`);

    expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    done();
  });
});

describe(`post /articles/:articleId/comments API end-points`, () => {
  test(`When post /articles/:articleId/comments status code should be 200`, async (done) => {
    const response = await request(app)
      .post(`/api/articles/FotbOO/comments`)
      .send({
        text: `Новый комментарий`
      });

    expect(response.statusCode).toBe(HttpCode.CREATED);
    expect(response.body.text).toBe(`Новый комментарий`);
    done();
  });

  test(`Should 400 because text property doesn't exist`, async () => {
    const response = await request(app)
      .post(`/api/articles/FotbOO/comments`)
      .send({name: `Новый комментарий`});

    expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
});
