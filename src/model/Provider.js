const { Model, DataTypes } = require('sequelize')


class Provider extends Model {
    static init(connection) {
        super.init({
            provider_id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.STRING(70),
            cnpj: DataTypes.STRING(14)
        }, {
            sequelize: connection,
        })
    }
    static associate(models) {
        this.hasOne(models.Batch, { foreignKey: 'provider_id', as: 'batchs' })
    //    this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' })
    //    this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' })
    }
}

module.exports = Provider