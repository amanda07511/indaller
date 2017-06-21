'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Villes', {
      ville_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ville_departement: {
        type: Sequelize.STRING
      },
      ville_nom_reel: {
        type: Sequelize.STRING
      },
      ville_code_postal: {
        type: Sequelize.STRING
      },
      ville_longitude_deg: {
        type: Sequelize.FLOAT
      },
      ville_latitude_deg: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('Villes');
  }
};