const MedicineTypeController = require('../controllers/MedicineTypeController')

module.exports = routes => {
    routes.get(process.env.START_OF_ROUTER + '/medicine_type', MedicineTypeController.get)
    routes.get(process.env.START_OF_ROUTER + '/medicine_type/:medicine_type_id', MedicineTypeController.getById)
    routes.post(process.env.START_OF_ROUTER + '/medicine_type', MedicineTypeController.save)
    routes.put(process.env.START_OF_ROUTER + '/medicine_type/:medicine_type_id', MedicineTypeController.save)
}