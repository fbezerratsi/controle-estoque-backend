const { Model, DataTypes } = require('sequelize')


class Stock extends Model {
    static init(connection) {
        super.init({
            stock_id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.STRING(70),
        }, {
            sequelize: connection
        })
    }
    static associate(models) {
        this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address' })
        //this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' })
    }
}

module.exports = Stock