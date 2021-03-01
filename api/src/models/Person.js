const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const { Message } = require('./Message');

class Person extends Model {}

Person.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    primaryKey: false,
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false,
  sequelize
});

Person.hasMany(Message);

module.exports = { Person };
