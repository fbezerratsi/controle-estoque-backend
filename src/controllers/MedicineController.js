
const Medicine = require('../model/Medicine')
const TherapeuticClass = require('../model/TherapeuticClass')
const ActivePrinciple = require('../model/ActivePrinciple')
const { validationMedicine } = require('../validation/medicinesValidation');

const { associations } = require('../model/Medicine');
const { edit } = require('./ProviderController');

module.exports =  {

    async getById(req, res) {

        const medicine_id  = req.params.medicine_id
        
        await Medicine.findOne({
            attributes: { exclude: ['medicine_id', 'createdAt', 'updatedAt', 'active_principle_id'] },
            include: [
                {
                    model: ActivePrinciple,
                    as: 'active_principle',
                    attributes: ['name']
                },
                {
                    model: TherapeuticClass,
                    as: 'therapeutic_class',
                    through: { attributes: [] }
                },
            ],
            where: {
                medicine_id,
            },
        })
            .then(med => res.status(200).json(med))
            .catch(err => res.status(500).send(err))

    },
    async get(req, res) {
        await Medicine.findAll({
            include: [
                {
                    model: ActivePrinciple,
                    as: 'active_principle',
                    attributes: ['name']
                },
                {
                    model: TherapeuticClass,
                    as: 'therapeutic_class',
                    through: { attributes: [] }
                },
            ]
        })
            .then(med => res.status(200).json(med))
            .catch(err => res.status(500).send(err))
    },
    async edit(req, res) {
        const { medicine_id } = req.params
        const medicine = await Medicine.findByPk(medicine_id)

        const { ...data } = req.body

        //res.json(data)

        let newMedicine = validationMedicine(data, Medicine)
        if (newMedicine.code) {
            res.json(newMedicine)
        } else {
            
            await medicine.update(data, {
                include: ['active_principle'],
            })
            await medicine.setTherapeutic_class(data.therapeutic_class_id)
                .then(med => res.status(201).json(med))
        }
    },
    async save(req, res) {

        const medicine = { ...req.body }
        
        let newMedicine = validationMedicine(medicine, Medicine)
        
        if (newMedicine.code) {
            res.json(newMedicine)
        } else {
            const med = await Medicine.create(medicine, {
                include: ['active_principle']
            })
            
            await med.addTherapeutic_class(medicine.therapeutic_class_id)
                .then(med => res.status(201).json(med))    
        }
    }
}