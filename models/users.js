// import the sequelize and pg modules
const { Sequelize, DataTypes } = require('sequelize');
// import the dotenv module to load the environment variables
require ("dotenv").config({path:"variables.env"})

// create a sequelize instance and connect it to the postgres database
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    port: 5432,
    dialect: 'postgres'
  });

// define a user model with the sequelize.define method
const User = sequelize.define('User',{
    document:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    firstName:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
      isEmail: true
    }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    speciality:{
        type:DataTypes.STRING,
        allowNull:false
    },
})

// sync the user model with the database and create or update the table
User.sync({ force: false }).then(() => {
  // Now the `users` table in the database corresponds to the model definition
});

module.exports = User;
