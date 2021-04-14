const Address = require('../model/Address')
const { existsOrErro, notExistsOrErro, numericField } = require('../model/validation');

module.exports =  {
    async get(req, res) {
        
        await Address.findAll({
            include: { association: 'users' }
        })
            .then(address => res.json(address))
            .catch(err => res.status(500).send(err))
    },
    async save(address) {
        
        

    }

}