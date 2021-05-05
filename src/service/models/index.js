"use strict";
const Aliase = require(`./aliase`);
const defineArticle = require(`./article`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineUser = require(`./user`);
const defineArticleCategory = require(`./articleCategories`);

const define = (sequelize) => {
  const Article = defineArticle(sequelize);
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const User = defineUser(sequelize);
  const ArticleCategory = defineArticleCategory(sequelize);

  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `articleId`});
  Comment.belongsTo(Article, {foreignKey: `articleId`, as: Aliase.ARTICLES});

  User.hasMany(Article, {as: Aliase.ARTICLES, foreignKey: `userId`});
  Article.belongsTo(User, {foreignKey: `userId`, as: Aliase.USERS});

  User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `userId`});
  Comment.belongsTo(User, {foreignKey: `userId`, as: Aliase.USERS});

  // Article.belongsToMany(Category, {through: `articleCategories`, as: Aliase.CATEGORIES});
  // Category.belongsToMany(Article, {through: `articleCategories`, as: Aliase.ARTICLES});

  Article.belongsToMany(Category, {through: ArticleCategory, as: Aliase.CATEGORIES});
  Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.OFFERS});
  Category.hasMany(ArticleCategory, {as: Aliase.ARTICLES_CATEGORIES});

  return {Article, Category, Comment, User, ArticleCategory};

};

module.exports = define;
