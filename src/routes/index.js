const express = require('express')

const loadInitalConfigurationRoutes = require('./initialConfiguration')
const loadUsersRoutes = require('./users')
const loadProvidersRoutes = require('./providers')
const loadShelvesRoutes = require('./shelves')
const loadAddressRoutes = require('./address')
const loadStockRoutes = require('./stock')

const routes = express.Router()

loadInitalConfigurationRoutes(routes)
loadUsersRoutes(routes)
loadProvidersRoutes(routes)
loadShelvesRoutes(routes)
loadAddressRoutes(routes)
loadStockRoutes(routes)

module.exports = routes