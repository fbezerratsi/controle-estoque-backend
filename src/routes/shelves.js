const ProviderController = require('../controllers/ShelfController')

module.exports = routes => {
    routes.get(process.env.START_OF_ROUTER + '/shelves', ProviderController.get)
    routes.get(process.env.START_OF_ROUTER + '/shelves/:shelf_id', ProviderController.getById)
    routes.post(process.env.START_OF_ROUTER + '/shelves', ProviderController.save)
    routes.put(process.env.START_OF_ROUTER + '/shelves/:shelf_id', ProviderController.save)
}