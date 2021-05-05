/* eslint-disable consistent-return */
'use strict';

const {HttpCode} = require(`../../constants`);

const articleKeys = [`title`, `announce`, `fullText`, `createdDate`, `categories`];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
