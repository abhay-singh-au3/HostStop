const Sequelize = require("sequelize");
const db = require("./config");

module.exports = db.sequelize.define("hostplacemodel", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  hostemail: {
    type: Sequelize.STRING,
    allowNull: false
  },
  header: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  persons: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});
