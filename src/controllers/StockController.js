const Stock = require('../model/Stock')
const Address = require('../model/Address')
const { validationStock } = require('../validation/stockValidation');
const { associations } = require('../model/Stock');


module.exports =  {

    async getById(req, res) {

        const stock_id  = req.params.stock_id
        
        await Stock.findByPk(stock_id, {
            include: { association: 'address' }
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

        const data = { ...req.body }
        //const {...data}  = req.body

        let newStock = validationStock(data)
        if (newStock.code) {
            res.json(newStock)
        } else {
            /* await stock.update(data, {
                include: ['address'],
            })
                .then(med => res.status(201).json(med)) */

            const r = await stock.update(data)
                
            await Address.update(data.address, {
                where: { address_id: r.address_id }
            })
                .then(stock => res.status(200).json(stock))
            
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

        
        
        /* if (stock.stock_id) { // Atualizar um usuário no banco
            await Stock.update(
                stock,
                { 
                    include: { association: 'address' },
                    where: { stock_id: stock.stock_id },
                    returning: true
                },
            )
                .then(u => {
                    addressIdTheReturn = {...u[1]}[0].address_id
                    Address.update(stock.address, {
                        where: { address_id: addressIdTheReturn },
                        returning: true
                    })
                    res.status(202).json({...u[1]}[0])
                })
                .then(a => res.status(202).json(a))
                .catch(_ => res.status(500).send())

        } */
        
        

    }
}