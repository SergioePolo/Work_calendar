const { Sequelize } = require('sequelize');
require ("dotenv").config({path:"variables.env"})

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "postgres",
  });

const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      // close the connection after testing it
      //await sequelize.close();
      //console.log("Connection has been closed successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

module.exports = { sq: sequelize, connectDB };
