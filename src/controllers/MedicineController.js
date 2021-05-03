
const Medicine = require('../model/Medicine')
const TherapeuticClass = require('../model/TherapeuticClass')
const ActivePrinciple = require('../model/ActivePrinciple')
const { existsOrErro, notExistsOrErro, equalsOrErro } = require('../model/validation');
const { associations } = require('../model/Medicine');

module.exports =  {

    async getById(req, res) {

        const medicine_id  = req.params.medicine_id
        
        await Medicine.findOne({
            attributes: { exclude: ['medicine_id', 'createdAt', 'updatedAt', 'active_principle_id'] },
            where: {
                medicine_id,
            },
            include: ['active_principle', 'therapeutic_class'],
            
            //attributes: ['commercial_name', 'type_of_medicine'],
            where: { medicine_id }
        })
            .then(med => res.status(200).json(med))
            .catch(err => res.status(500).send(err))

    },
    async get(req, res) {
        
        await Medicine.findAll({
            include: ['active_principle', 'therapeutic_class'],
            //attributes: ['commercial_name', 'type_of_medicine'],
            through: {
                attributes: ['therapeutic_class_id']
            }
        })
            .then(med => res.status(200).json(med))
            .catch(err => res.status(500).send(err))
    },
    async save(req, res) {

        const medicine = { ...req.body }
                
        const med = await Medicine.create(medicine, {
            include: ['active_principle']
        })
        
        await med.addTherapeutic_class(medicine.therapeutic_class_id)
            .then(med => res.status(201).json(med))
        











            
        //res.json(medicine)
        //user.cpf = user.cpf.trim().replace(/[.-]/g, '')
               
        /* if (req.params.medicine_id) medicine.medicine_id = req.params.medicine_id
        
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