const { existsOrErro } = require('../validation/validation')


function fieldSize(value, msg, size) {
    if (value.length > size) throw msg
}

function enumField(value, msg, array) {

    const result = array.indexOf(value)
    
    if (result === -1) throw msg
    
}

function validationMedicine(medicine, Medicine) {
    const enumTypeOfMedicine = Medicine.rawAttributes.type_of_medicine.values
    const enumClassification = Medicine.rawAttributes.classification.values
    const enumStripe = Medicine.rawAttributes.stripe.values

    medicine.commercial_name = medicine.commercial_name.trim()
    medicine.unit_of_measurement = medicine.unit_of_measurement.trim()

    try {
        
        existsOrErro(medicine.commercial_name, {"code": 410, "message": "medicine field is mandatory"})
        existsOrErro(medicine.unit_of_measurement, {"code": 410, "message": "medicine field is mandatory"})
        existsOrErro(medicine.type_of_medicine, {"code": 410, "message": "medicine field is mandatory"})
        existsOrErro(medicine.stripe, {"code": 410, "message": "medicine field is mandatory"})
        existsOrErro(medicine.classification, {"code": 410, "message": "medicine field is mandatory"})
        existsOrErro(medicine.active_principle_id, {"code": 410, "message": "medicine field is mandatory"})
        fieldSize(medicine.commercial_name, {"code": 411, "message": "supplier field must have a maximum of 70 characters."}, 70)
        fieldSize(medicine.unit_of_measurement, {"code": 411, "message": "supplier field must have a maximum of 10 characters."}, 10)
        enumField(medicine.classification, {"code": 412, "message": `Only allowed [${enumClassification}] in the field CLASSIFICATION`}, enumClassification)
        enumField(medicine.type_of_medicine, {"code": 412, "message": `Only allowed [${enumTypeOfMedicine}] in the field TYPE OF MEDICINE`}, enumTypeOfMedicine)
        enumField(medicine.stripe, {"code": 412, "message": `Only allowed [${enumStripe}] in the field STRIPE`}, enumStripe)
        
    } catch(msg) {
        return msg
    }

    return medicine
}
    

module.exports = { fieldSize, enumField, validationMedicine }