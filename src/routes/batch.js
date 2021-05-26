const BatchController = require('../controllers/BatchController')

module.exports = routes => {
    routes.post(process.env.START_OF_ROUTER + '/batchs', BatchController.save)
    routes.get(process.env.START_OF_ROUTER + '/batchs/:batchs_id', BatchController.getById)
    routes.get(process.env.START_OF_ROUTER + '/batchs', BatchController.get)
    routes.put(process.env.START_OF_ROUTER + '/batchs/:batchs_id', BatchController.edit)
}