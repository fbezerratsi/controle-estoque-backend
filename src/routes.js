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
routes.post('/users', UserController.save)
routes.put('/users/:id', UserController.save)
routes.get('/users', UserController.get)
routes.get('/users/:id', UserController.getById)

routes.get('/providers', ProviderController.get)
routes.get('/providers/:uuid', ProviderController.getById)
routes.post('/providers', ProviderController.save)
routes.put('/providers/:uuid', ProviderController.save)
//routes.get('/report', ReportController.show)
module.exports = routes

/** ############################################################################################# */
/**
 * @swagger
 * components:
 *      schemas:
 *          Users:
 *              type: object
 *              required:
 *                  - name
 *                  - cpf
 *                  - email
 *                  - password
 *                  - admin
 *              properties:
 *                  id:
 *                      type: uuid
 *                      description: The auto-generated uuid of the Users
 *                  name:
 *                      type: string
 *                      description: The user name
 *                  cpf:
 *                      type: string
 *                      description: The user cpf
 *                  email:
 *                      type: string
 *                      description: The user email
 *                  password:
 *                      type: string
 *                      description: The user password
 *                  admin:
 *                      type: boolean
 *                      description: The user admin
 *              example:
 *                  name: "Felipe Bezerra dos Santos"
 *                  cpf: "00000000000"
 *                  email: "felipe@gmail.com"
 *                  password: "12345"
 *                  admin: true
 */
/** ############################################################################################# */

/**
 * @swagger
 * components:
 *      schemas:
 *          Provider:
 *              type: object
 *              required:
 *                  - name
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
 *                  name: "Medical master MEI"
 *                  cnpj: "93756364000190"
 */

/**
 * @swagger
 * tags:
 *      name: Users
 *      description: The user managing API
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

/**
 * @swagger
 * /providers/{uuid}:
 *  put:
 *      summary: Update the provider by the uuid
 *      tags: [Providers]
 *      parameters:
 *        - in: path
 *          name: uuid
 *          schema:
 *              type: string
 *          required: true
 *          description: The provider uuid
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Provider'
 *      responses:
 *        200:
 *          description: The provider was updated
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Provider'
 *        404:
 *          description: The provider was not found
 *        500:
 *          description: Some error happened
 *      
 *          
 */
