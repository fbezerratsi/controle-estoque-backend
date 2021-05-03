const MedicineController = require('../controllers/MedicineController')

module.exports = routes => {
    routes.post(process.env.START_OF_ROUTER + '/medicines', MedicineController.save)
    routes.get(process.env.START_OF_ROUTER + '/medicines/:medicine_id', MedicineController.getById)
    routes.get(process.env.START_OF_ROUTER + '/medicines', MedicineController.get)
    //routes.put(process.env.START_OF_ROUTER + '/shelves/:shelf_id', ProviderController.save)
}