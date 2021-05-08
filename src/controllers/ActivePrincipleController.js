const ActivePrinciple = require('../model/ActivePrinciple')
const { fieldSizeProvider, existsOrErro, notExistsOrErro } = require('../validation/validation');

module.exports =  {

    async get(req, res) {
        await ActivePrinciple.findAll()
            .then(activePrinciple => res.json(activePrinciple))
            .catch(err => res.status(500).send(err))
    },
    async getById(req, res) {
        const active_principle_id = req.params.active_principle_id
        
        await ActivePrinciple.findOne({ where: { active_principle_id } })
            .then(active_principle => {
                if (!active_principle) res.status(404)
                res.json(active_principle)
            })
            .catch(err => res.status(500).send(err))
    
    },
    async save(req, res) {
        
        const active_principle = { ...req.body }
        active_principle.name = active_principle.name.trim()
        
        if (req.params.active_principle_id) active_principle.active_principle_id = req.params.active_principle_id
        
        
        try {
        
            existsOrErro(active_principle.name, {"code": 410, "message": "active principle field is mandatory"})
            fieldSizeProvider(active_principle.name, {"code": 411, "message": "supplier field must have a maximum of 70 characters."})
            

            const ActivePrincipleFromDB = await ActivePrinciple.findOne(
                { 
                    where: { name: active_principle.name }
                })
            if (!active_principle.active_principle_id) {
                notExistsOrErro(ActivePrincipleFromDB, {"code": 412, "message": "supplier already registered"})
            }
            
        } catch(msg) {
            return res.status(400).send(msg)
        }

        
        if (active_principle.active_principle_id) { // Atualizar um usuário no banco
            await ActivePrinciple.update(active_principle, { where: { active_principle_id: active_principle.active_principle_id } })
                .then(s => res.status(204).json({s}))
                .catch(err => res.status(500).send(err))
        } else { // Inserir um usuário no banco
            await ActivePrinciple.create(active_principle)
                .then(s => res.status(201).json({s}))
                .catch(err => res.status(500).send(err))
        }

    }

}