const Sequelize = require('sequelize');
const db = require('../config/databaseConfig');

const {DataTypes} = Sequelize;

//schema
const Users = db.define('user', {
    email:{
        type: DataTypes.STRING
    },
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{                 //menyimpan refresh token ke database
        type: DataTypes.TEXT
    }
});

module.exports = Users;
