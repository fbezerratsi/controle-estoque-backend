const { Op } = require('sequelize')
const Provider = require('../model/Provider')
const { fieldSizeProvider, fieldSizeCnpj, numericField, existsOrErro } = require('../validation/validation');

module.exports =  {

    async get(req, res) {
        await Provider.findAll()
            .then(provider => res.json(provider))
            .catch(err => res.status(500).send(err))
    },
    async getById(req, res) {
        const provider_id = req.params.provider_id
        
        await Provider.findOne({ where: { provider_id } })
            .then(provider => {
                if (!provider) res.status(404)
                res.json(provider)
            })
            .catch(err => res.status(500).send(err))
    
    },
    async edit(req, res) {
        const provider = { ...req.body }
        
        newProvider = validationProvider(provider)
        
        //Se der erro entra aqui
        if (newProvider.code) {
            res.status(400).json(newProvider)
        } else {
            if (req.params.provider_id) {
                provider.provider_id = req.params.provider_id
    
                await Provider.update(newProvider, { where: { provider_id: provider.provider_id } })
                    .then(prov => res.status(204).json({prov}))
                    .catch(err => res.status(500).send(err))
            }
        }
        
    },
    async save(req, res) {
        const provider = { ...req.body }

        newProvider = validationProvider(provider)
        
        //Se der erro entra aqui
        if (newProvider.code) {
            res.status(400).json(newProvider)
        } else {
            await Provider.findOrCreate({
                where: [
                    { name: newProvider.name },
                    { cnpj: newProvider.cnpj }
                ],
                defaults: newProvider
            })
                .then( ([ provider, created ]) => {
                    if (created) {
                        res.status(201).json(provider)
                    } else {
                        res.json({"code": 412, "message": "supplier already registered"})
                    }
                })
        }

        /* provider.name = provider.name.trim()
        provider.cnpj = provider.cnpj.trim().replace(/[./-]/g, '') // elimina os espaços desnecessários e os caracteres especiais

        try {
        
            existsOrErro(provider.name, {"code": 410, "message": "provider field is mandatory"})
            fieldSizeProvider(provider.name, {"code": 411, "message": "supplier field must have a maximum of 70 characters."})    
            fieldSizeCnpj(provider.cnpj, {"code": 414, "message": "cnpj field must be 14 characters"})
            numericField(provider.cnpj, {"code": 413, "message": "cnpj field is not valid data"})            
            
        } catch(msg) {
            return res.status(400).send(msg)
        } */

        

    }

}

function validationProvider(provider) {
    provider.name = provider.name.trim()
    provider.cnpj = provider.cnpj.trim().replace(/[./-]/g, '') // elimina os espaços desnecessários e os caracteres especiais

    try {
    
        existsOrErro(provider.name, {"code": 410, "message": "provider field is mandatory"})
        fieldSizeProvider(provider.name, {"code": 411, "message": "supplier field must have a maximum of 70 characters."})    
        fieldSizeCnpj(provider.cnpj, {"code": 414, "message": "cnpj field must be 14 characters"})
        numericField(provider.cnpj, {"code": 413, "message": "cnpj field is not valid data"})            
        
    } catch(msg) {
        return msg
    }

    return provider
}