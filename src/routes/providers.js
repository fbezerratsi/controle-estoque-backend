const ProviderController = require('../controllers/ProviderController')

module.exports = routes => {
    routes.get('/providers', ProviderController.get)
    routes.get('/providers/:uuid', ProviderController.getById)
    routes.post('/providers', ProviderController.save)
    routes.put('/providers/:uuid', ProviderController.save)
}