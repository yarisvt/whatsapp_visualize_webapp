const { Model, DataTypes } = require('sequelize');
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

Message.belongsToMany(Word, { through: 'Message_Word', timestamps: false });
Word.belongsToMany(Message, { through: 'Message_Word', timestamps: false });

module.exports = { Message };
