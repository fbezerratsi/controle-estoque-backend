const config = require('./sequelizefile.js')
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
const Stock = require('../model/Stock')
Stock.init(sequelize)


Stock.associate(sequelize.models)
User.associate(sequelize.models)
Address.associate(sequelize.models)


module.exports = sequelize