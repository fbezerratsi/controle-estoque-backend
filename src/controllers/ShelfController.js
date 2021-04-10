const Shelf = require('../model/Shelf')
const { fieldSizeProvider, existsOrErro, notExistsOrErro } = require('../model/validation');

module.exports =  {

    async get(req, res) {
        await Shelf.findAll()
            .then(shelf => res.json(shelf))
            .catch(err => res.status(500).send(err))
    },
    async getById(req, res) {
        const shelf_id = req.params.shelf_id
        
        await Shelf.findOne({ where: { shelf_id } })
            .then(shelf => {
                if (!shelf) res.status(404)
                res.json(shelf)
            })
            .catch(err => res.status(500).send(err))
    
    },
    async save(req, res) {
        
        const shelf = { ...req.body }
        shelf.name = shelf.name.trim()
        
        if (req.params.shelf_id) shelf.shelf_id = req.params.shelf_id
        
        
        try {
        
            existsOrErro(shelf.name, {"code": 410, "message": "shelf field is mandatory"})
            fieldSizeProvider(shelf.name, {"code": 411, "message": "supplier field must have a maximum of 70 characters."})
            

            const ShelfFromDB = await Shelf.findOne(
                { 
                    where: { name: shelf.name }
                })
            if (!shelf.shelf_id) {
                notExistsOrErro(ShelfFromDB, {"code": 412, "message": "supplier already registered"})
            }
            
        } catch(msg) {
            return res.status(400).send(msg)
        }

        
        if (shelf.shelf_id) { // Atualizar um usuário no banco
            await Shelf.update(shelf, { where: { shelf_id: shelf.shelf_id } })
                .then(s => res.status(204).json({s}))
                .catch(err => res.status(500).send(err))
        } else { // Inserir um usuário no banco
            await Shelf.create(shelf)
                .then(s => res.status(201).json({s}))
                .catch(err => res.status(500).send(err))
        }

    }

}