const { existsOrErro, numericField } = require('../validation/validation')


function fieldSize(value, msg, size) {
    if (value.length > size) throw msg
}

function allocateStockError(batch, msg){
    let AmountSum = 0
    
    batch.stocks.forEach(function(stock, i) {
        AmountSum += stock['amount']
    })
    if (AmountSum > batch.total_amount) {
        throw msg
    }
    
}

function validationBatch(batchBody) {
    
    batchBody.batch_number = batchBody.batch_number.trim()
    batchBody.brand = batchBody.brand.trim()
    batchBody.arrival_date = batchBody.arrival_date.trim()
    batchBody.expiration_date = batchBody.expiration_date.trim()
    batchBody.ms_record = batchBody.ms_record.trim()
    batchBody.provider_id = batchBody.provider_id.trim()

    try {
        allocateStockError(batchBody, {"code": 412, "message": "Valor destinado ao estoque ultrapassa o limite do lote"})
        
        existsOrErro(batchBody.total_amount, {"code": 410, "message": "total amount field is mandatory"})
        existsOrErro(batchBody.remaining_amount, {"code": 410, "message": "remaining amount field is mandatory"})
        existsOrErro(batchBody.batch_number, {"code": 410, "message": "batch_number field is mandatory"})
        existsOrErro(batchBody.brand, {"code": 410, "message": "brand field is mandatory"})
        existsOrErro(batchBody.arrival_date, {"code": 410, "message": "arrival date field is mandatory"})
        existsOrErro(batchBody.expiration_date, {"code": 410, "message": "expiration date field is mandatory"})
        existsOrErro(batchBody.ms_record, {"code": 410, "message": "ms record field is mandatory"})
        existsOrErro(batchBody.provider_id, {"code": 410, "message": "provider id field is mandatory"})
        existsOrErro(batchBody.medicine_id, {"code": 410, "message": "medicine id field is mandatory"})
        
        fieldSize(batchBody.brand, {"code": 411, "message": "supplier field must have a maximum of 70 characters."}, 70)
        fieldSize(batchBody.ms_record, {"code": 411, "message": "supplier field must have a maximum of 13 characters."}, 13)
        
        numericField(batchBody.total_amount, {"code": 412, "message": "field accepts numbers only"})
        numericField(batchBody.remaining_amount, {"code": 412, "message": "field accepts numbers only"})
        numericField(batchBody.batch_number, {"code": 412, "message": "field accepts numbers only"})
        
    } catch(msg) {
        return msg
    }

    return batchBody
}
    

module.exports = { fieldSize, validationBatch }