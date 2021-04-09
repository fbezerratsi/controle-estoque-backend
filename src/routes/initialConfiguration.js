const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')

module.exports = routes => {
    routes.post('/signup', UserController.save)
    routes.post('/signin', AuthController.signin)
    routes.post('/validateToken', AuthController.validateToken)
}