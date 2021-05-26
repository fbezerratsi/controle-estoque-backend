const { existsOrErro, fieldSize } = require('./validation')


function validationStock(stockBody) {
    stockBody.name = stockBody.name.trim()
    stockBody.address.street = stockBody.address.street.trim()
    stockBody.address.number = stockBody.address.number.trim()
    stockBody.address.district = stockBody.address.district.trim()
    stockBody.address.zipcode = stockBody.address.zipcode.trim()
    stockBody.address.state = stockBody.address.state.trim()
    stockBody.address.city = stockBody.address.city.trim()

    try {
        
        existsOrErro(stockBody.name, {"code": 410, "message": "name field is mandatory"})
        
        fieldSize(stockBody.name, {"code": 411, "message": "supplier field must have a maximum of 70 characters."}, 70)
                
    } catch(msg) {
        return msg
    }

    return stockBody
}
    

module.exports = { validationStock }