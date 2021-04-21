const TherapeuticClass = require('../model/TherapeuticClass')
const { fieldSizeProvider, existsOrErro, notExistsOrErro } = require('../model/validation');

module.exports =  {

    async get(req, res) {
        await TherapeuticClass.findAll()
            .then(therapeuticClass => res.json(therapeuticClass))
            .catch(err => res.status(500).send(err))
    },
    async getById(req, res) {
        const therapeutic_class_id = req.params.therapeutic_class_id
        
        await TherapeuticClass.findOne({ where: { therapeutic_class_id } })
            .then(therapeutic_class => {
                if (!therapeutic_class) res.status(404)
                res.json(therapeutic_class)
            })
            .catch(err => res.status(500).send(err))
    
    },
    async save(req, res) {
        
        const therapeutic_class = { ...req.body }
        therapeutic_class.name = therapeutic_class.name.trim()
        
        if (req.params.therapeutic_class_id) therapeutic_class.therapeutic_class_id = req.params.therapeutic_class_id
        
        
        try {
        
            existsOrErro(therapeutic_class.name, {"code": 410, "message": "therapeutic class field is mandatory"})
            fieldSizeProvider(therapeutic_class.name, {"code": 411, "message": "supplier field must have a maximum of 70 characters."})
            

            const TherapeuticClassFromDB = await TherapeuticClass.findOne(
                { 
                    where: { name: therapeutic_class.name }
                })
            if (!therapeutic_class.therapeutic_class_id) {
                notExistsOrErro(TherapeuticClassFromDB, {"code": 412, "message": "supplier already registered"})
            }
            
        } catch(msg) {
            return res.status(400).send(msg)
        }

        
        if (therapeutic_class.therapeutic_class_id) { // Atualizar um usuário no banco
            await TherapeuticClass.update(therapeutic_class, { where: { therapeutic_class_id: therapeutic_class.therapeutic_class_id } })
                .then(s => res.status(204).json({s}))
                .catch(err => res.status(500).send(err))
        } else { // Inserir um usuário no banco
            await TherapeuticClass.create(therapeutic_class)
                .then(s => res.status(201).json({s}))
                .catch(err => res.status(500).send(err))
        }

    }

}