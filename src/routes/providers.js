const ProviderController = require('../controllers/ProviderController')

module.exports = routes => {
    routes.get(process.env.START_OF_ROUTER + '/providers', ProviderController.get)
    routes.get(process.env.START_OF_ROUTER + '/providers/:provider_id', ProviderController.getById)
    routes.post(process.env.START_OF_ROUTER + '/providers', ProviderController.save)
    routes.put(process.env.START_OF_ROUTER + '/providers/:provider_id', ProviderController.edit)
}