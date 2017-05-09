'use strict';
module.exports = function(sequelize, DataTypes) {
  var Dossier = sequelize.define('Dossier', {
    user: DataTypes.INTEGER,
    titre: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Dossier;
};