const { Model, DataTypes } = require('sequelize')


class User extends Model {
    static init(connection) {
        super.init({
            user_id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.STRING,
            cpf: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            admin: DataTypes.BOOLEAN,
        }, {
            sequelize: connection
        })
    }
    static associate(models) {
        this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address' })
        //this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' })
    }
}

module.exports = User