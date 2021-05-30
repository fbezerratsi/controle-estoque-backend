const { Model, DataTypes } = require('sequelize')
const BatchForStock = require('./BatchForStock')


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
            sequelize: connection,
            tableName: 'stocks'
        })
    }
    static associate(models) {
        this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address' })
        //this.belongsToMany(models.Batch, { foreignKey: 'stock_id', through: 'batch_for_stock', as: 'batchs' })
        this.belongsToMany(models.Batch, { through: {model: BatchForStock}, foreignKey: 'stock_id', as: 'batchs' })
    }
}

module.exports = Stock