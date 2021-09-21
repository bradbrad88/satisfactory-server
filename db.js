const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully");
} catch (error) {
  console.error("Unable to connect to the database", error);
}

exports.default = sequelize;
