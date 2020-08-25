'use strict';

const request = require(`supertest`);

const app = require(`../start-server`);
const {HttpCode} = require(`../../constants`);

describe(`Search API end-points`, () => {
  test(`When get search status code should be 200`, async (done) => {
    const response = await request(app).get(encodeURI(`/api/search?query=квадрокоптер`));
    expect(response.statusCode).toBe(200);
    done();
  });

  test(`Should 404 because result search with text query doesn't exist`, async (done) => {
    const res = await request(app).get(encodeURI(`/api/search?query=вертолёты`));
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    done();
  });
});
