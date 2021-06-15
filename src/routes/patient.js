const PatientController = require('../controllers/PatientController')

module.exports = routes => {
    routes.post(process.env.START_OF_ROUTER + '/patients', PatientController.save)
    routes.put(process.env.START_OF_ROUTER + '/patients/:patient_id', PatientController.save)
    routes.get(process.env.START_OF_ROUTER + '/patients', PatientController.get)
    routes.get(process.env.START_OF_ROUTER + '/patients/:patient_id', PatientController.getById)
}

