const { Model, DataTypes } = require('sequelize')


class MedicineType extends Model {
    static init(connection) {
        super.init({
            medicine_type_id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.STRING(70),
            description: DataTypes.STRING(255),
        }, {
            sequelize: connection,
        })
    }
    static associate(models) {
        //this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' })
        //this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' })
    }
}

module.exports = MedicineType