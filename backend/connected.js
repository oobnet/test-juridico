const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)


/* dialect one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
const sequelize = new Sequelize('test', 'root', '123123123', {
    host: 'localhost',
    dialect:'postgres'
  });
  

  
module.exports =  {sequelize} 