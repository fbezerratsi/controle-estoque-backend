const MedicineType = require('../model/MedicineType')
const { fieldSizeProvider, existsOrErro, notExistsOrErro } = require('../model/validation');

module.exports =  {

    async get(req, res) {
        await MedicineType.findAll()
            .then(medicine_type => res.json(medicine_type))
            .catch(err => res.status(500).send(err))
    },
    async getById(req, res) {
        const medicine_type_id = req.params.medicine_type_id
        
        await MedicineType.findOne({ where: { medicine_type_id } })
            .then(medicine_type => {
                if (!medicine_type) res.status(404)
                res.json(medicine_type)
            })
            .catch(err => res.status(500).send(err))
    
    },
    async save(req, res) {
        
        const medicine_type = { ...req.body }
        medicine_type.name = medicine_type.name.trim()
        medicine_type.description = medicine_type.description.trim()
        
        if (req.params.medicine_type_id) medicine_type.medicine_type_id = req.params.medicine_type_id
        
        
        try {
        
            existsOrErro(medicine_type.name, {"code": 410, "message": "Type of Medicine field is mandatory"})
            fieldSizeProvider(medicine_type.name, {"code": 411, "message": "supplier field must have a maximum of 70 characters."})
            

            const MedicineTypeFromDB = await MedicineType.findOne(
                { 
                    where: { name: medicine_type.name }
                })
            if (!medicine_type.medicine_type_id) {
                notExistsOrErro(MedicineTypeFromDB, {"code": 412, "message": "supplier already registered"})
            }
            
        } catch(msg) {
            return res.status(400).send(msg)
        }

        
        if (medicine_type.medicine_type_id) { // Atualizar um usuário no banco
            await MedicineType.update(medicine_type, { where: { medicine_type_id: medicine_type.medicine_type_id } })
                .then(s => res.status(204).json({s}))
                .catch(err => res.status(500).send(err))
        } else { // Inserir um usuário no banco
            await MedicineType.create(medicine_type)
                .then(s => res.status(201).json({s}))
                .catch(err => res.status(500).send(err))
        }

    }

}