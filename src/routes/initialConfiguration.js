const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')

module.exports = routes => {
    routes.post(process.env.START_OF_ROUTER + '/signup', UserController.save)
    routes.post(process.env.START_OF_ROUTER + '/signin', AuthController.signin)
    routes.post(process.env.START_OF_ROUTER + '/validateToken', AuthController.validateToken)
}