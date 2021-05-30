'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('batch_for_stock', {
      amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
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
