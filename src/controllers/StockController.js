const Stock = require('../model/Stock')
const Address = require('../model/Address')
const { existsOrErro, notExistsOrErro } = require('../validation/validation');


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
            include: { association: 'address' }
        })
            .then(stocks => res.json(stocks))
            .catch(err => res.status(500).send(err))
    },
    async save(req, res) {

        const stock = { ...req.body }

        stock.name = stock.name.trim()
        if (stock.address.street) {
            stock.address.street = stock.address.street.trim()
            stock.address.number = stock.address.number.trim()
            stock.address.district = stock.address.district.trim()
            stock.address.zipcode = stock.address.zipcode.trim()
            stock.address.state = stock.address.state.trim()
            stock.address.city = stock.address.city.trim()
        }
        
        if (req.params.stock_id) stock.stock_id = req.params.stock_id
        
        try {
            existsOrErro(stock.name, {"code": 410, "message": "stock field is mandatory"})

            const stockFromDB = await Stock.findOne({ where: { name: stock.name } })
            if (!stock.stock_id) {
                notExistsOrErro(stockFromDB, {"code": 412, "message": "supplier already registered"})
            }
            
        } catch(msg) {
            return res.status(400).send(msg)
        }
        
        if (stock.stock_id) { // Atualizar um usuário no banco
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

        } else { // Inserir um usuário no banco
            
            await Stock.create(
                stock,
                {include: { association: 'address' }}
            )
                .then(u => res.status(201).json(u))
            
        }

    }
}