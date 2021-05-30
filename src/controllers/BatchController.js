
const Batch = require('../model/Batch')
const Stock = require('../model/Stock')
const BatchForStock = require('../model/BatchForStock.js')
const Provider = require('../model/Provider')
const Medicine = require('../model/Medicine')
const { validationBatch } = require('../validation/batchValidation');
//const { allocateStockError } = require('../validation/stockValidation');

module.exports =  {

    async getById(req, res) {

        /* const medicine_id  = req.params.medicine_id
        
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
            .catch(err => res.status(500).send(err)) */

    },
    async get(req, res) {
        await Batch.findAll({
            attributes: { exclude: ['total_amount', 'remaining_amount', 'batch_number', 'brand', 'arrival_date', 'expiration_date', 'ms_record', 'createdAt', 'updatedAt', 'medicine_id', 'provider_id'] },
            include: [
                {
                    model: Provider,
                    as: 'provider',
                    attributes: ['name']
                },
                {
                    model: Medicine,
                    as: 'medicine',
                    attributes: ['commercial_name']
                },
                {
                    model: Stock,
                    as: 'stocks',
                    through: { attributes: ['amount'] }
                }
            ]
        })
            .then(med => res.status(200).json(med))
            .catch(err => res.status(500).send(err))
    },
    async edit(req, res) {
        /* const { medicine_id } = req.params
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
        } */
    },
    async save(req, res) {
        
        const {...batch} = req.body
        
        let newBatch = validationBatch(batch)
        
        if (newBatch.code) {
            res.json(newBatch)
        } else {
            
            const newBat = await Batch.create(batch, {
                include: ['provider', 'medicine']
            })
            
            batch.stocks.forEach(function(stock, i) {
                
                newBat.decrement('remaining_amount', { by: stock['amount'] })
                newBat.addStock(stock['stock_id'], {
                    through: { amount: stock['amount'] } 
                })
            })

            res.status(200).send(newBat)
        }
                      
    }
}