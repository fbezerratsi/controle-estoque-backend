const { Model, DataTypes } = require('sequelize')


class Address extends Model {
    static init(connection) {
        super.init({
            address_id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            street: DataTypes.STRING(70),
            number: DataTypes.STRING(10),
            district: DataTypes.STRING(70),
            zipcode: DataTypes.STRING(8),
            state: DataTypes.STRING(2),
            city: DataTypes.STRING(70),
        }, {
            sequelize: connection
        })
    }
    static associate(models) {
        this.hasOne(models.Stock, { foreignKey: 'address_id', as: 'stocks' })
        this.hasOne(models.User, { foreignKey: 'address_id', as: 'users' })
        this.hasOne(models.Patient, { foreignKey: 'address_id', as: 'patients' })
    }
}

module.exports = Address