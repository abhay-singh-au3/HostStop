const Sequelize = require("sequelize");
const db = {};
const URL = require("../DBURL")

const sequelize = new Sequelize(URL);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync({ force: true }).then(res => console.log("table created" + res));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
