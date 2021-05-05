"use strict";

const defineModels = require(`../models`);
const Aliase = require(`../models/aliase`);

module.exports = async (sequelize, {categories, articles, users}) => {
  const {
    Article,
    Category,
    User,
  } = defineModels(sequelize);
  await sequelize.sync({force: true});

  await User.bulkCreate(
      users.map((item) => ({email: item.email,
        firstname: item.firstname,
        lastname: item.lastname,
        pass: item.pass,
        avatarPath: item.avatarPath}))
  );

  // const userPromises = users.map(async (user) => await User.create(user));
  // await Promise.all(userPromises);

  const categoryModels = await Category.bulkCreate(
      categories.map((item) => ({name: item}))
  );

  const categoryIdByName = categoryModels.reduce((acc, next) => ({
    [next.name]: next.id,
    ...acc
  }), {});

  const articlePromises = articles.map(async (article) => {
    const articleModel = await Article.create(article, {include: [Aliase.COMMENTS, Aliase.USERS]});
    await articleModel.addCategories(article.categories.map(
        (name) => categoryIdByName[name]
    ));
  });
  await Promise.all(articlePromises);

};
