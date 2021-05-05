'use strict';

const Aliase = require(`../models/aliase`);

class CommentService {

  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
  }

  async findAll(article) {
    return await this._Comment.findAll({
      where: {articleId: article.id},
      include: [Aliase.USERS],
    });
  }

  async findAllComments() {
    return await this._Comment.findAll({
      include: [Aliase.USERS],
    });
  }

  async drop(id) {
    const deletedRows = await this._Comment.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

  async create(articleId, comment) {
    return await this._Comment.create({
      articleId,
      ...comment
    });
  }

}

module.exports = CommentService;
