'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_email: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      company_economic_group: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      address_first_name: {
        type: Sequelize.TEXT
      },
      address_last_name: {
        type: Sequelize.TEXT
      },
      address_address: {
        type: Sequelize.TEXT
      },
      address_city: {
        type: Sequelize.TEXT
      },
      address_state: {
        type: Sequelize.TEXT
      },
      address_postal_code: {
        type: Sequelize.TEXT
      },
      address_type: {
        type: Sequelize.INTEGER
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('addresses');
  }
};
