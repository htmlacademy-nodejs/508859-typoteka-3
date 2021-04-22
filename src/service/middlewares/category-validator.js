'use strict';

const {HttpCode} = require(`../../constants`);

const categoryKeys = [`name`];

module.exports = (req, res, next) => {
  const newCategory = req.body;
  const keys = Object.keys(newCategory);
  const keysExists = categoryKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
