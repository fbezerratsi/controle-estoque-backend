const { Model, DataTypes } = require('sequelize')


class ActivePrinciple extends Model {
    static init(connection) {
        super.init({
            active_principle_id: {
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
        this.hasOne(models.Medicine, { foreignKey: 'active_principle_id', as: 'medicines' })
        //this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' })
    }
}

module.exports = ActivePrinciple