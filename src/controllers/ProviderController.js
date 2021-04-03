const { json } = require('express');
const { Op } = require("sequelize");
const Provider = require('../model/Provider')
const { fieldSizeProvider, fieldSizeCnpj, numericField, existsOrErro, notExistsOrErro } = require('../model/validateProvider');

module.exports =  {

    async get(req, res) {
        await Provider.findAll()
            .then(provider => res.json(provider))
            .catch(err => res.status(500).send(err))
    },
    async getById(req, res) {
        const uuid = req.params.uuid
        
        await Provider.findOne({ where: { uuid } })
            .then(provider => res.json(provider))
            .catch(err => res.status(500).send(err))
    },
    async save(req, res) {
        
        const provider = { ...req.body }
        provider.name = provider.name.trim()
        provider.cnpj = provider.cnpj.trim()
        
        if (req.params.uuid) provider.uuid = req.params.uuid
        
        
        try {
        
            existsOrErro(provider.name, {"code": 410, "message": "provider field is mandatory"})
            fieldSizeProvider(provider.name, {"code": 411, "message": "supplier field must have a maximum of 70 characters."})    
            fieldSizeCnpj(provider.cnpj, {"code": 414, "message": "cnpj field must be 14 characters"})
            numericField(provider.cnpj, {"code": 413, "message": "cnpj field is not valid data"})            
            

            const ProviderFromDB = await Provider.findOne(
                { 
                    where: { 
                        [Op.or]: [
                            {cnpj: provider.cnpj},
                            {name: provider.name}
                        ] 
                    }
                })
            if (!provider.uuid) {
                console.log('Entrou')
                notExistsOrErro(ProviderFromDB, {"code": 412, "message": "supplier already registered"})
            }
            
        } catch(msg) {
            return res.status(400).send(msg)
        }

        
        if (provider.uuid) { // Atualizar um usuário no banco
            await Provider.update(provider, { where: { uuid: provider.uuid } })
                .then(prov => res.status(204).json({prov}))
                .catch(err => res.status(500).send(err))
        } else { // Inserir um usuário no banco
            await Provider.create(provider)
                .then(prov => res.status(201).json({prov}))
                .catch(err => res.status(500).send(err))
        }

    }

}