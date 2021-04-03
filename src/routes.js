const express = require('express')
const UserController = require('./controllers/UserController')
const ProviderController = require('./controllers/ProviderController')
//const AddressController = require('./controllers/AddressController')
//const TechController = require('./controllers/TechController')
//const ReportController = require('./controllers/ReportController.txt')
const auth = require('./controllers/auth')
const passport = require('./config/passport')

const routes = express.Router()

routes.get('/', (req, res) => {
    return res.json({ hello: 'World' })
})

routes.post('/signup', UserController.save)
routes.post('/signin', auth.signin)
routes.post('/validateToken', auth.validateToken)

//routes.all("/usuarios*", passport.passaporte().authenticate())
routes.post('/usuarios', UserController.save)
routes.put('/usuarios/:id', UserController.save)
routes.get('/usuarios', UserController.get)
routes.get('/usuarios/:id', UserController.getById)

routes.post('/provider', ProviderController.save)
routes.put('/provider/:uuid', ProviderController.save)
routes.get('/provider', ProviderController.get)
routes.get('/provider/:uuid', ProviderController.getById)

//routes.get('/report', ReportController.show)

module.exports = routes