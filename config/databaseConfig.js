const Sequelize = require('sequelize');
const env = require('../utils/utilsEnv')

module.exports = {
  USERNAME: env('DB_USERNAME'),
  PASSWORD: env('DB_PASSWORD'),
  DB: env('DB_NAME'),
  HOSTNAME: env('DB_HOSTNAME'),
  PORT: env('DB_PORT'),  
  dialect: 'mysql',
};

const db = new Sequelize('click', 'root', '', {
  host: 'localhost',
  port: '8000',
  dialect: 'mysql',
  operatorsAliases: 0,
});

module.exports = db;