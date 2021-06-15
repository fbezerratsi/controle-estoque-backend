const Patient = require('../model/Patient')
const Address = require('../model/Address')
const { existsOrErro, notExistsOrErro, equalsOrErro } = require('../validation/validation');

module.exports =  {

    async getById(req, res) {

        /* const user_id  = req.params.user_id
        console.log(user_id)
        const user = await User.findByPk(user_id, {
            include: { association: 'address' }
        })
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err)) */

    },
    async get(req, res) {
        
        /* await User.findAll({
            include: { association: 'address' }
        })
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err)) */
    },
    async save(req, res) {
        
        try {
            const patient = { ...req.body }

            await Patient.create(
                patient,
                {include: { association: 'address' }}
            )
                .then(patient => res.status(201).json(patient))    
        } catch (error) {
            res.status(400).send(error.errors)
        }
        //res.json(patient)

        

        /* const user = { ...req.body }
        
        user.cpf = user.cpf.trim().replace(/[.-]/g, '')

        if (user.address.street) {
            user.address.street = user.address.street.trim()
            user.address.number = user.address.number.trim()
            user.address.district = user.address.district.trim()
            user.address.zipcode = user.address.zipcode.trim()
            user.address.state = user.address.state.trim()
            user.address.city = user.address.city.trim()
        }
        
        if (req.params.user_id) user.user_id = req.params.user_id
        
        try {
            existsOrErro(user.name, {"code": 410, "message": "name field is mandatory"})
            existsOrErro(user.cpf, {"code": 410, "message": "cpf field is mandatory"})
            existsOrErro(user.email, {"code": 410, "message": "email field is mandatory"})
            existsOrErro(user.password, {"code": 410, "message": "password field is mandatory"})
            existsOrErro(user.confirmPassword, {"code": 410, "message": "confirm password field is mandatory"})
            equalsOrErro(user.password, user.confirmPassword, {"code": 410, "message": "passwords do not match"})

            const userFromDB = await User.findOne({ where: { cpf: user.cpf } })
            if (!user.user_id) {
                notExistsOrErro(userFromDB, {"code": 412, "message": "supplier already registered"})
            }
            
            
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(req.body.password)
        delete user.confirmPassword

        if (user.user_id) { // Atualizar um usuário no banco
            await User.update(
                user,
                { 
                    include: { association: 'address' },
                    where: { user_id: user.user_id },
                    returning: true
                },
            )
                .then(u => {
                    addressIdTheReturn = {...u[1]}[0].address_id
                    Address.update(user.address, {
                        where: { address_id: addressIdTheReturn },
                        returning: true
                    })
                    res.status(202).json({...u[1]}[0])
                })
                .then(a => res.status(202).json(a))
                .catch(_ => res.status(500).send())

        } else { // Inserir um usuário no banco
            
            await User.create(
                user,
                {include: { association: 'address' }}
            )
                .then(u => res.status(201).json(u))
            
        } */

    }
}