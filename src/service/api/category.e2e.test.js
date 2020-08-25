'use strict';

const request = require(`supertest`);
const app = require(`../start-server`);

describe(`Category API end-points`, () => {
  test(`When get categories status code should be 200`, async (done) => {
    const response = await request(app).get(`/api/categories`);
    expect(response.statusCode).toBe(200);
    done();
  });
});
