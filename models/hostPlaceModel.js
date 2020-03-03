const Sequelize = require("sequelize");
const db = require("./config");

module.exports = db.Sequelize.define("hostPlaceModel", {
  id: {
    type: Sequelize.INTEGER
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
    type: Sequelize.INTEGER,
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
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true
  }
});
