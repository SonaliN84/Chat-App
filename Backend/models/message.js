const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Message = sequelize.define("messages", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Message;
