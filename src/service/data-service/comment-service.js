'use strict';

const Aliase = require(`../models/aliase`);

class CommentService {

  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
  }

  findAll(article) {
    return this._Comment.findAll({
      where: {articleId: article.id},
      include: [Aliase.USERS],
    });
  }

  findAllComments() {
    return this._Comment.findAll({
      include: [Aliase.USERS],
    });
  }

  drop(id) {
    const deletedRows = this._Comment.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

  create(articleId, comment) {
    return this._Comment.create({
      articleId,
      ...comment
    });
  }

}

module.exports = CommentService;
