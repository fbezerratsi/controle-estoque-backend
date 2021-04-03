
function fieldSizeProvider(value, msg) {
    if (value.length > 70) throw msg
}
function fieldSizeCnpj(value, msg) {
    if (value) {
        if (value.length !== 14) throw msg
    }
    
}
function numericField(value, msg) {
    if (isNaN(value)) throw msg
}



function existsOrErro(value, msg) {
    if (!value) throw msg
    if (Array.isArray(value) && value.length === 0) throw msg
    if (typeof value === 'string' && !value.trim()) throw msg
}
function notExistsOrErro(value, msg) {
    try {
        existsOrErro(value, msg)
    } catch (msg) {
        return
    }
    throw msg
}

module.exports = { fieldSizeProvider, fieldSizeCnpj, numericField, existsOrErro, notExistsOrErro }