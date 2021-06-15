'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('patients', { 
      patient_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false
      },
      card_sus: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      observations: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      address_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'addresses', key: 'address_id' },
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
    return queryInterface.dropTable('patients');
  }
};
