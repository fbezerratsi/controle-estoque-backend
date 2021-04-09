const ProviderController = require('../controllers/ProviderController')

module.exports = routes => {
    routes.get('/providers', ProviderController.get)
    routes.get('/providers/:provider_id', ProviderController.getById)
    routes.post('/providers', ProviderController.save)
    routes.put('/providers/:provider_id', ProviderController.save)
}