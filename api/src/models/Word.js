const { Model, DataTypes } = require('sequelize');
const { MessageWord } = require('./MessageWord');
const { sequelize } = require('../database');

class Word extends Model {}

Word.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  word: {
    primaryKey: false,
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false,
  sequelize
});

module.exports = { Word };
