const { Model, DataTypes } = require('sequelize')


class BatchForStock extends Model {
    static init(connection) {
        super.init({
            amount: DataTypes.INTEGER,
        }, {
            sequelize: connection,
            tableName: 'batch_for_stock'
        })
    }
    static associate(models) {
        /* this.belongsToMany(models.Batch, { through: 'batch_for_stock', foreignKey: 'batch_id'})
        this.belongsToMany(models.Stock, { through: 'batch_for_stock', foreignKey: 'stock_id'}) */
    }
}

module.exports = BatchForStock