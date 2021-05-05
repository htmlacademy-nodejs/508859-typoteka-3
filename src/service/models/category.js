"use strict";

const {DataTypes, Model} = require(`sequelize`);

class Category extends Model {}

const define = (sequelize) => Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  sequelize,
  modelName: `Category`,
  tableName: `categories`
});

module.exports = define;
