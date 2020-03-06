const Sequelize = require("sequelize");
const db = require("./config");
module.exports = db.sequelize.define("bookedPlacesModel", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  useremail: {
    type: Sequelize.STRING,
    allowNull: false
  },
  checkIn: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  checkOut: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  total: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
