const Sequelize = require("sequelize");
const db = {};

const connectionURI = "postgres://postgres:sankalp1711@127.0.0.1:5432/hoststop";
const sequelize = new Sequelize(connectionURI);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync({force:true}).then(res => console.log("table created" + res));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
