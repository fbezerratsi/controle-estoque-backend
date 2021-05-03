'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('medicines', { 
      medicine_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      commercial_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      unit_of_measurement: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      type_of_medicine: {
        type: Sequelize.STRING,
        //values: ["Medicamento Básico","Psicotrópico","Injetável"],
        allowNull: false,
      },
      stripe: {
        type: Sequelize.STRING,
        //values: ["Sem Tarja", "Amarela", "Vermelha", "Preta"],
        allowNull: false,
      },
      classification: {
        type: Sequelize.STRING,
        //values: ["Referência", "Similar", "Genérico"],
        allowNull: false,
      },
      active_principle_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'active_principles', key: 'active_principle_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('medicines');
  }
};
