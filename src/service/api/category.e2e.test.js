'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const category = require(`./category`);
const DataService = require(`../data-service/category-service`);
const {HttpCode} = require(`../../constants`);

const mockCategories = [`За жизнь`, `Деревья`];

const mockArticles = [{
  title: `Лучшие рок-музыканты 20-века`,
  createdDate: `2021-04-18T11:46:32.262Z`,
  imagePath: `/img/sea@1x.jpg`,
  announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  fullText: `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  categories: [`За жизнь`]
}];

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, articles: mockArticles, users: []});
  category(app, new DataService(mockDB));
});

describe(`API returns category list`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 2 categories`, () => expect(response.body.length).toBe(2));

  test(`Category names are "За жизнь", "Деревья"`,
      () => expect(response.body.map((it) => it.name)).toEqual(
          expect.arrayContaining([`За жизнь`, `Деревья`])
      )
  );

});
