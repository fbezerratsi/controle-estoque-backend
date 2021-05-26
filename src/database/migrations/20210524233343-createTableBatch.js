'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('batchs', { 
      batch_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      total_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      remaining_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      batch_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      arrival_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      expiration_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ms_record: {
        type: Sequelize.STRING(13),
        allowNull: false
      },
      provider_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'providers', key: 'provider_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      medicine_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'medicines', key: 'medicine_id' },
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
    return queryInterface.dropTable('batchs');
  }
};
