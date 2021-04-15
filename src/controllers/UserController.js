const User = require('../model/User')
const Address = require('../model/Address')
const bcrypt = require('bcrypt-nodejs')
const { existsOrErro, notExistsOrErro, equalsOrErro } = require('../model/validation');
const { use } = require('passport');

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
            await User.update(
                {
                    'name': user.name,
                    'cpf': user.cpf,
                    'email': user.email,
                    'password': user.password,
                    'admin': user.admin,
                },
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
                {
                    'name': user.name,
                    'cpf': user.cpf,
                    'email': user.email,
                    'password': user.password,
                    'admin': user.admin,
                    'address': {
                        'street': user.address.street,
                        'number': user.address.number,
                        'district': user.address.district,
                        'zipcode': user.address.zipcode,
                        'state': user.address.state,
                        'city': user.address.city,
                    }
                },
                {include: { association: 'address' }}
            )
                .then(u => res.status(201).json(u))
            
        }

    }
}