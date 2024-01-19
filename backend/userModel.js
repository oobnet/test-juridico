
const { DataTypes } = require('sequelize');

const {sequelize} = require('./connected')
// const sequelize = new Sequelize('sqlite::memory:');
const date = new Date();

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    // allowNull defaults to true
    // allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
   
  },
  email: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  telefone: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  user_id: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  cord: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },

  x: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },

  y: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
}
);

module.exports = {User}