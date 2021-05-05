"use strict";

const {DataTypes, Model} = require(`sequelize`);

class Article extends Model {}

const define = (sequelize) => Article.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imagePathFull: {
    type: DataTypes.STRING,
    allowNull: true
  },
  announce: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullText: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: `Article`,
  tableName: `articles`
});

module.exports = define;
