const UserController = require('../controllers/UserController')

module.exports = routes => {
    routes.post(process.env.START_OF_ROUTER + '/users', UserController.save)
    routes.put(process.env.START_OF_ROUTER + '/users/:user_id', UserController.save)
    routes.get(process.env.START_OF_ROUTER + '/users', UserController.get)
    routes.get(process.env.START_OF_ROUTER + '/users/:user_id', UserController.getById)
}

