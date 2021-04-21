const ActivePrincipleController = require('../controllers/ActivePrincipleController')

module.exports = routes => {
    routes.get(process.env.START_OF_ROUTER + '/active_principle', ActivePrincipleController.get)
    routes.get(process.env.START_OF_ROUTER + '/active_principle/:active_principle_id', ActivePrincipleController.getById)
    routes.post(process.env.START_OF_ROUTER + '/active_principle', ActivePrincipleController.save)
    routes.put(process.env.START_OF_ROUTER + '/active_principle/:active_principle_id', ActivePrincipleController.save)
}