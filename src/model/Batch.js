const { Model, DataTypes, DATE } = require('sequelize')


class Batch extends Model {
    static init(connection) {
        super.init({
            batch_id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            total_amount: DataTypes.INTEGER,
            remaining_amount: DataTypes.INTEGER,
            batch_number: DataTypes.INTEGER,
            brand: DataTypes.STRING(70),
            arrival_date: DataTypes.DATE,
            expiration_date: DataTypes.DATE,
            ms_record: DataTypes.STRING(13)
        }, {
            sequelize: connection
        })
    }
    static associate(models) {
        this.belongsTo(models.Provider, { foreignKey: 'provider_id', as: 'provider' })
        this.belongsTo(models.Medicine, { foreignKey: 'medicine_id', as: 'medicine' })
        this.belongsToMany(models.Stock, { foreignKey: 'batch_id', through: 'batch_for_stock', as: 'stocks' })
    }
}

module.exports = Batch