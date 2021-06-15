const { Model, DataTypes } = require('sequelize')


class Patient extends Model {
    static init(connection) {
        super.init({
            patient_id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "<field_name> name is mandatory."
                    },
                    len: {
                        args: [1, 70],
                        msg: "<field_name> does not have the allowed size"
                    }
                }
                
            },
            cpf: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isNumeric: true,
                    len: {
                        args: [11],
                        msg: "<field_cpf> does not have the allowed size"
                    }
                }
            },
            card_sus: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isNumeric: true,
                    len: {
                        args: [15],
                        msg: "<field_card_sus> does not have the allowed size"
                    }
                }
            },
            birth_date: DataTypes.DATE,
            observations: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'patients',
            freezeTableName: 'patients'
        })
    }
    static associate(models) {
        this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address' })
    }
}

module.exports = Patient