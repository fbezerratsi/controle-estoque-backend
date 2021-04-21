const TherapeuticClassController = require('../controllers/TherapeuticClassController')

module.exports = routes => {
    routes.get(process.env.START_OF_ROUTER + '/therapeutic_class', TherapeuticClassController.get)
    routes.get(process.env.START_OF_ROUTER + '/therapeutic_class/:therapeutic_class_id', TherapeuticClassController.getById)
    routes.post(process.env.START_OF_ROUTER + '/therapeutic_class', TherapeuticClassController.save)
    routes.put(process.env.START_OF_ROUTER + '/therapeutic_class/:therapeutic_class_id', TherapeuticClassController.save)
}