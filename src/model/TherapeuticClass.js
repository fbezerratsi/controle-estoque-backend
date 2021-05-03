const { Model, DataTypes } = require('sequelize')


class TherapeuticClass extends Model {
    static init(connection) {
        super.init({
            therapeutic_class_id: {
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
        this.belongsToMany(models.Medicine, { foreignKey: 'therapeutic_class_id', through: 'medicine_therap_classes', as: 'medicines' })
        //this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' })
        //this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' })
    }
}

module.exports = TherapeuticClass