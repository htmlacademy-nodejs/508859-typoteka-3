'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const search = require(`./search`);
const DataService = require(`../data-service/search-service`);

const {HttpCode} = require(`../../constants`);

const mockCategories = [`За жизнь`, `Деревья`];

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
  id: 5,
  title: `Лучшие рок-музыканты 20-века`,
  createdDate: `2021-04-18T11:46:32.262Z`,
  imagePath: `/img/sea@1x.jpg`,
  announce: `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  fullText: `Он написал больше 30 хитов.`,
  categories: [`За жизнь`, `Деревья`],
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

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, articles: mockArticles, users: []});
  search(app, new DataService(mockDB));
});

describe(`API returns article based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Учим HTML и CSS`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`1 article found`, () => expect(response.body.length).toBe(1));

  test(`Article has correct title`, () => expect(response.body[0].title).toBe(`Учим HTML и CSS`));
});

test(`API returns code 404 if nothing is found`,
    () => request(app)
      .get(`/search`)
      .query({
        query: `Продам новый мотоцикл`
      })
      .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
      .get(`/search`)
      .expect(HttpCode.BAD_REQUEST)
);
