const Stock = require('../model/Stock')
const Address = require('../model/Address')
const { validationStock } = require('../validation/stockValidation');
const { associations } = require('../model/Stock');


module.exports =  {

    async getById(req, res) {

        const stock_id  = req.params.stock_id
        
        await Stock.findByPk(stock_id, {
            attributes: ['name'],
            include: [
                {
                    model: Address,
                    as: 'address',
                    attributes: ['street','number','district','zipcode','state','city']
                }
            ]
            //include: { association: 'address' }
        })
            .then(stock => res.json(stock))
            .catch(err => res.status(500).send(err))

    },
    async get(req, res) {
        
        await Stock.findAll({
            attributes: ['stock_id','name'],
            include: [
                {
                    model: Address,
                    as: 'address',
                    attributes: ['street','number','district','zipcode','state','city']
                }
            ]
        })
            .then(stocks => res.json(stocks))
            .catch(err => res.status(500).send(err))
    },
    async edit(req, res) {

        const { stock_id } = req.params
        const stock = await Stock.findByPk(stock_id)

        const {...data} = req.body
        
        let newStock = validationStock(data)
        if (newStock.code) {
            res.json(newStock)
        } else {
            
            const s = await stock.update(data, {
                include: ['address']
            })
                
            await Address.update(data.address, {
                where: { address_id: s.address_id }
            })
                .then(_ => res.status(200).send(data))
                .catch(erro => res.send(erro))
            
            
        }

    },
    async save(req, res) {

        const stock = { ...req.body }


        let newStock = validationStock(stock)
        
        if (newStock.code) {
            res.json(newStock)
        } else {
            await Stock.create(stock, {
                include: ['address']
            })
                .then(u => res.status(201).json(u))
        }

    }
}