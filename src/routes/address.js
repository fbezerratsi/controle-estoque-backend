const AddressController = require('../controllers/AddressController')

module.exports = routes => {
    routes.get(process.env.START_OF_ROUTER + '/addresses', AddressController.get)
    /* routes.get(process.env.START_OF_ROUTER + '/shelves/:shelf_id', ProviderController.getById)
    routes.post(process.env.START_OF_ROUTER + '/shelves', ProviderController.save)
    routes.put(process.env.START_OF_ROUTER + '/shelves/:shelf_id', ProviderController.save) */
}