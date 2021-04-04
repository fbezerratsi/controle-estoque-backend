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
 *          Provider:
 *              type: object
 *              required:
 *                  - name
 *              properties:
 *                  provider_uuid:
 *                      type: uuid
 *                      description: The auto-generated uuid of the Provider
 *                  name:
 *                      type: string(70)
 *                      description: The provider name
 *                  cnpj:
 *                      type: string(14)
 *                      description: The provider cnpj
 *              example:
 *                  name: "Medical master MEI"
 *                  cnpj: "93756364000190"
 */

/**
 * @swagger
 * tags:
 *      name: Providers
 *      description: The provider managing API
 */

/**
 * @swagger
 * /providers:
 *      get:
 *          summary: Return the list of all the providers
 *          tags: [Providers]
 *          responses:
 *              201:
 *                  description: The response
 *                  schema:
 *                      type: object
 *                      $ref-json: '#/components/schemas/Provider'
 *
 * 
 */

routes.get('/providers', ProviderController.get)

/**
 * @swagger
 * /providers/{provider_uuid}:
 *      get:
 *          sumary: Get the provider by uuid
 *          tags: [Providers]
 *          parameters:
 *              - in: path
 *                name: provider_uuid
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
routes.get('/providers/:provider_uuid', ProviderController.getById)

/**
 * @swagger
 * /providers:
 *  post:
 *      sumary: Create a new provider
 *      tags: [Providers]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Provider'
 *      responses:
 *          201:
 *              description: The provider was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Provider'
 *          400:
 *              description: Registering a supplier when not providing the required
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Provider'
 *          500:
 *              description: Some server
 */
routes.post('/providers', ProviderController.save)
routes.put('/providers/:provider_uuid', ProviderController.save)


//routes.get('/report', ReportController.show)

module.exports = routes