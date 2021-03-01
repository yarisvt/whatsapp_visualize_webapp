const { Model, DataTypes } = require('sequelize');
const { MessageWord } = require('./MessageWord');
const { Word } = require('./Word');
const { sequelize } = require('../database');

class Message extends Model {}

Message.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  time: {
    primaryKey: false,
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false,
  sequelize
});

Message.belongsToMany(Word, { through: MessageWord });
Word.belongsToMany(Message, { through: MessageWord });

module.exports = { Message };
