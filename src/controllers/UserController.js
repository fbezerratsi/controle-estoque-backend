const User = require('../model/User')
const Address = require('../model/Address')
const bcrypt = require('bcrypt-nodejs')
const { existsOrErro, notExistsOrErro, equalsOrErro } = require('../model/validation');

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports =  {

    async getById(req, res) {

        const user_id  = req.params.user_id
        console.log(user_id)
        const user = await User.findByPk(user_id, {
            include: { association: 'address' }
        })
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))

    },
    async get(req, res) {
        
        await User.findAll({
            include: { association: 'address' }
        })
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    },
    async save(req, res) {

        const user = { ...req.body }
        
        street = user.address.street.trim()
        number = user.address.number.trim()
        district = user.address.district.trim()
        zipcode = user.address.zipcode.trim()
        state = user.address.state.trim()
        city = user.address.city.trim()

        try {
            existsOrErro(street, {"code": 410, "message": "street field is mandatory"})
            existsOrErro(number, {"code": 410, "message": "number field is mandatory"})
            existsOrErro(district, {"code": 410, "message": "district field is mandatory"})
            existsOrErro(zipcode, {"code": 410, "message": "zipcode field is mandatory"})
            existsOrErro(state, {"code": 410, "message": "state field is mandatory"})
            existsOrErro(city, {"code": 410, "message": "city field is mandatory"})
        } catch(msg) {
            return {
                "code": 400,
                "msg": msg
            }
        }
        
        await Address.create({ street, number, district, zipcode, state, city })
            .then(a => {
                user.address_id = a.address_id
            })


        //res.json(user)
        
        
        if (req.params.user_id) user.user_id = req.params.user_id
        
        try {
            existsOrErro(user.name, "Nome não informado")
            existsOrErro(user.cpf, "CPF não informado")
            existsOrErro(user.email, "E-mail não informado")
            existsOrErro(user.password, "Senha não informado")
            existsOrErro(user.confirmPassword, "Confirmação de senha não informada")
            equalsOrErro(user.password, user.confirmPassword, "Senhas não conferem")

            const userFromDB = await User.findOne({ where: { cpf: user.cpf } })
            if (!user.user_id) {
                notExistsOrErro(userFromDB, "Usuário já cadastrado")
            }
            
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(req.body.password)
        delete user.confirmPassword

        if (user.user_id) { // Atualizar um usuário no banco
            await User.update(user, { where: { user_id: user.user_id } })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { // Inserir um usuário no banco
            await User.create(user)
                .then(u => res.status(201).json(u))
                .catch(err => res.status(500).send(err))
        }

    }
}