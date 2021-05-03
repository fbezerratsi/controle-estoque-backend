const { Model, DataTypes } = require('sequelize')


class Medicine extends Model {
    static init(connection) {
        super.init({
            medicine_id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            commercial_name: DataTypes.STRING(100),
            unit_of_measurement: DataTypes.STRING(10),
            type_of_medicine: DataTypes.ENUM("Medicamento Básico","Psicotrópico","Injetável"),
            stripe: DataTypes.ENUM("Sem Tarja", "Amarela", "Vermelha", "Preta"),
            classification: DataTypes.ENUM("Referência", "Similar", "Genérico"),
        }, {
            sequelize: connection
        })
    }
    static associate(models) {
        this.belongsTo(models.ActivePrinciple, { foreignKey: 'active_principle_id', as: 'active_principle' })
        this.belongsToMany(models.TherapeuticClass, { foreignKey: 'medicine_id', through: 'medicine_therap_classes', as: 'therapeutic_class' })
    }
}

module.exports = Medicine