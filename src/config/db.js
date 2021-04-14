const config = require('./sequelizefile.js')
//const config = require('dotenv')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config)

const User = require('../model/User')
User.init(sequelize)
const Provider = require('../model/Provider')
Provider.init(sequelize)
const Shelf = require('../model/Shelf')
Shelf.init(sequelize)
const Address = require('../model/Address')
Address.init(sequelize)


//Address.init(connection)
//Tech.init(connection)
//Address.associate(connection.models)
User.associate(sequelize.models)
Address.associate(sequelize.models)
//Tech.associate(connection.models)

module.exports = sequelize