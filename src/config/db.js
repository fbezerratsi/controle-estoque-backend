const config = require('./sequelizefile.js')
//const config = require('dotenv')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config)

const User = require('../model/User')
User.init(sequelize)
const Provider = require('../model/Provider')
Provider.init(sequelize)


//Address.init(connection)
//Tech.init(connection)

//Address.associate(connection.models)
//User.associate(connection.models)
//Tech.associate(connection.models)

module.exports = sequelize