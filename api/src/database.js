const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.DATABASE_HOSTNAME,
  port: process.env.DATABASE_PORT,
  logging: false,
  dialect: 'mariadb'
});

module.exports = { sequelize };
