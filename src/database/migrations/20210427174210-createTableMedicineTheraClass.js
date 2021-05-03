'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('medicine_therap_classes', {
      medicine_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'medicines', key: 'medicine_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      therapeutic_class_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'therapeutic_classes', key: 'therapeutic_class_id' },
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
    return queryInterface.dropTable('medicine_therap_classes');
  }
};
