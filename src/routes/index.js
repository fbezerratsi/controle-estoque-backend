const express = require('express')

const loadInitalConfigurationRoutes = require('./initialConfiguration')
const loadUsersRoutes = require('./users')
const loadProvidersRoutes = require('./providers')
const loadShelvesRoutes = require('./shelves')
const loadAddressRoutes = require('./address')
const loadStockRoutes = require('./stock')
const loadActivePrincipleRoutes = require('./activePrinciple')
const loadTherapeuticClassRoutes = require('./therapeuticClass')
const loadMedicineRoutes = require('./medicine')
const loadBatchRoutes = require('./batch')
const loadPatientRoutes = require('./patient')

const routes = express.Router()

loadInitalConfigurationRoutes(routes)
loadUsersRoutes(routes)
loadProvidersRoutes(routes)
loadShelvesRoutes(routes)
loadAddressRoutes(routes)
loadStockRoutes(routes)
loadActivePrincipleRoutes(routes)
loadTherapeuticClassRoutes(routes)
loadMedicineRoutes(routes)
loadBatchRoutes(routes)
loadPatientRoutes(routes)

module.exports = routes