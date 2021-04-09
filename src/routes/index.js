const express = require('express')

const loadInitalConfigurationRoutes = require('./initialConfiguration')
const loadUsersRoutes = require('./users')
const loadProvidersRoutes = require('./providers')

const routes = express.Router()

loadInitalConfigurationRoutes(routes)
loadUsersRoutes(routes)
loadProvidersRoutes(routes)

module.exports = routes