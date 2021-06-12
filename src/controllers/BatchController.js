
const Batch = require('../model/Batch')
const Stock = require('../model/Stock')
//const BatchForStock = require('../model/BatchForStock.js')
const Provider = require('../model/Provider')
const Medicine = require('../model/Medicine')
const { validationBatch } = require('../validation/batchValidation');
//const { allocateStockError } = require('../validation/stockValidation');

module.exports =  {

    async getById(req, res) {

        const batch_id  = req.params.batch_id
        
        await Batch.findOne({
            attributes: { exclude: ['batch_id', 'createdAt', 'updatedAt', 'provider_id', 'medicine_id'] },
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
            ],
            where: {
                batch_id,
            },
        })
            .then(bat => res.status(200).json(bat))
            .catch(err => res.status(500).send(err))

    },
    async get(req, res) {
        await Batch.findAll({
            attributes: { exclude: ['brand', 'arrival_date', 'expiration_date', 'ms_record', 'createdAt', 'updatedAt', 'medicine_id', 'provider_id'] },
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
        const { batch_id } = req.params
        const batch = await Batch.findByPk(batch_id)

        const { ...data } = req.body

        let newBatch = validationBatch(data)
        if (newBatch.code) {
            res.json(newBatch)
        } else {
            
            const newBatch = await batch.update(data, {
                include: ['provider', 'medicine'],
            })
            data.stocks.forEach((stock, i) => {
                
                newBatch.setStocks(stock.stock_id, {
                    through: { amount: stock['amount'] } 
                })
        
            })
            res.status(204).json(newBatch)
            
        }
    },
    async save(req, res) {
        
        let {...batch} = req.body
        
        let newBatch = validationBatch(batch)
        
        if (newBatch.code) {
            res.status(400).json(newBatch)
        } else {
            batch = { remaining_amount: batch.total_amount, ...batch }
            
            const newBatch = await Batch.create(batch, {
                include: ['provider', 'medicine']
            })
            let a = 0
            batch.stocks.forEach((stock, i) => {
                
                newBatch.decrement('remaining_amount', { by: stock['amount'] })
                
                newBatch.addStock(stock['stock_id'], {
                    through: { amount: stock['amount'] } 
                })
            })
            
            res.status(201).send(newBatch)
        }
                      
    }
}