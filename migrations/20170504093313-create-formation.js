'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Formations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.INTEGER
      },
      ecole: {
        type: Sequelize.STRING
      },
      domaine: {
        type: Sequelize.INTEGER
      },
      diplome: {
        type: Sequelize.STRING
      },
      ville: {
        type: Sequelize.INTEGER
      },
      ddd: {
        type: Sequelize.DATE
      },
      ddf: {
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Formations');
  }
};