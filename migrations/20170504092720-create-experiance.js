'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Experiances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.INTEGER
      },
      titre: {
        type: Sequelize.STRING
      },
      enterprise: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      ville: {
        type: Sequelize.INTEGER
      },
      ddd: {
        type: Sequelize.DATE
      },
      ddf: {
        type: Sequelize.DATE
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Experiances');
  }
};