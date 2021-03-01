const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database');

class MessageWord extends Model {}

MessageWord.init({
  id: {
    primaryKey: true,
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false
  }
}, {
  timestamps: false,
  sequelize
});

module.exports = { MessageWord };
