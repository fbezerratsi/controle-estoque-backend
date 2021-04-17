const StockController = require('../controllers/StockController')

module.exports = routes => {
    routes.post(process.env.START_OF_ROUTER + '/stocks', StockController.save)
    routes.put(process.env.START_OF_ROUTER + '/stocks/:stock_id', StockController.save)
    routes.get(process.env.START_OF_ROUTER + '/stocks', StockController.get)
    routes.get(process.env.START_OF_ROUTER + '/stocks/:stock_id', StockController.getById)
}

