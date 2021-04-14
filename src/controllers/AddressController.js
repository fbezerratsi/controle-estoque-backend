const Address = require('../model/Address')
const { existsOrErro, notExistsOrErro, numericField } = require('../model/validation');

module.exports =  {

    async save(address) {
        
        //const user = { ...req.body }

        street = address.street.trim()
        number = address.number.trim()
        district = address.district.trim()
        zipcode = address.zipcode.trim()
        state = address.state.trim()
        city = address.city.trim()

        try {
            existsOrErro(street, {"code": 410, "message": "street field is mandatory"})
            existsOrErro(number, {"code": 410, "message": "number field is mandatory"})
            existsOrErro(district, {"code": 410, "message": "district field is mandatory"})
            existsOrErro(zipcode, {"code": 410, "message": "zipcode field is mandatory"})
            existsOrErro(state, {"code": 410, "message": "state field is mandatory"})
            existsOrErro(city, {"code": 410, "message": "city field is mandatory"})
        } catch(msg) {
            return {
                "code": 400,
                "msg": msg
            }
        }
        
        await Address.create({ street, number, district, zipcode, state, city })
            .then(a => {
                return a
            })
            
        
        //return {...a}
        
        /* if (req.params.address_id) address.address_id = req.params.address_id
        
        
        try {
        
            existsOrErro(address.name, {"code": 410, "message": "address field is mandatory"})
            fieldSizeaddress(address.name, {"code": 411, "message": "supplier field must have a maximum of 70 characters."})    
            fieldSizeCnpj(address.cnpj, {"code": 414, "message": "cnpj field must be 14 characters"})
            numericField(address.cnpj, {"code": 413, "message": "cnpj field is not valid data"})            
            

            const addressFromDB = await address.findOne(
                { 
                    where: { 
                        [Op.or]: [
                            {cnpj: address.cnpj},
                            {name: address.name}
                        ] 
                    }
                })
            if (!address.address_id) {
                console.log('Entrou')
                notExistsOrErro(addressFromDB, {"code": 412, "message": "supplier already registered"})
            }
            
        } catch(msg) {
            return res.status(400).send(msg)
        }

        
        if (address.address_id) { // Atualizar um usuário no banco
            await address.update(address, { where: { address_id: address.address_id } })
                .then(prov => res.status(204).json({prov}))
                .catch(err => res.status(500).send(err))
        } else { // Inserir um usuário no banco
            await address.create(address)
                .then(prov => res.status(201).json({prov}))
                .catch(err => res.status(500).send(err))
        } */

    }

}