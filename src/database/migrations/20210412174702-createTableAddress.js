'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', { 
      address_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      street: {
        type: Sequelize.STRING(70),
        allowNull: true,
      },
      number: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      district: {
        type: Sequelize.STRING(70),
        allowNull: true,
      },
      zipcode: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(70),
        allowNull: true,
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
    return queryInterface.dropTable('addresses');
  }
};
