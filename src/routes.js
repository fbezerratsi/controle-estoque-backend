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

/**
 * @swagger
 * components:
 *      schemas:
 *          Book:
 *              type: object
 *              required:
 *                  - name
 *                  - cnpj
 *              properties:
 *                  uuid:
 *                      type: uuid
 *                      description: The auto-generated uuid of the Provider
 *                  name:
 *                      type: string(70)
 *                      description: The provider name
 *                  cnpj:
 *                      type: string(14)
 *                      description: The provider cnpj
 *              example:
 *                  uuid: dbf5cf74-808f-4aa7-b926-e9ca47aa0c94
 *                  name: Medical master MEI
 *                  cnpj: 93756364000190
 */

/**
 * @swagger
 * tags:
 *      name: Providers
 *      description: The provider managing API
 */


/**
 * @openapi
 * /providers:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
routes.get('/providers', ProviderController.get)

/**
 * @swagger
 * /providers/{uuid}:
 *      get:
 *          sumary: Get the provider by uuid
 *          tags: [Providers]
 *          parameters:
 *              - in: path
 *                name: uuid
 *                schema:
 *                  type: string
 *                required: true
 *                description: The provider uuid
 *          responses:
 *              200:
 *                  description: The provider description by uuid
 *                  contens:
 *                      application/json:
 *                          schema:
 *                              $ref-json: './model/Provider'
 *              404:
 *                  description: The provider was not found
 */
routes.get('/providers/:uuid', ProviderController.getById)

routes.post('/providers', ProviderController.save)
routes.put('/providers/:uuid', ProviderController.save)


//routes.get('/report', ReportController.show)

module.exports = routes