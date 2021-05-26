'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('batch_for_stock', {
      batch_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'batchs', key: 'batch_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      stock_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'stocks', key: 'stock_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('batch_for_stock');
  }
};
