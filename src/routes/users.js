const UserController = require('../controllers/UserController')

module.exports = routes => {
    routes.post('/users', UserController.save)
    routes.put('/users/:id', UserController.save)
    routes.get('/users', UserController.get)
    routes.get('/users/:id', UserController.getById)
}

