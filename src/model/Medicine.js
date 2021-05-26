const { Model, DataTypes } = require('sequelize')


class Medicine extends Model {
    static init(connection) {
        super.init({
            medicine_id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            commercial_name: DataTypes.STRING(70),
            unit_of_measurement: DataTypes.STRING(10),
            type_of_medicine: DataTypes.ENUM("MEDICAMENTO BÁSICO","PSICOTRÓPICO","INJETÁVEL"),
            stripe: DataTypes.ENUM("SEM TARJA", "AMARELA", "VERMELHA", "PRETA"),
            classification: DataTypes.ENUM("REFERÊNCIA", "SIMILAR", "GENÉRICO"),
        }, {
            sequelize: connection
        })
    }
    static associate(models) {
        this.belongsTo(models.ActivePrinciple, { foreignKey: 'active_principle_id', as: 'active_principle' })
        this.belongsToMany(models.TherapeuticClass, { foreignKey: 'medicine_id', through: 'medicine_therap_classes', as: 'therapeutic_class' })
        this.hasOne(models.Batch, { foreignKey: 'medicine_id', as: 'batchs' })
    }
}

module.exports = Medicine