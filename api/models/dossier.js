'use strict';
module.exports = function(sequelize, DataTypes) {
  var Dossier = sequelize.define('Dossier', {
    id: DataTypes.INTEGER,
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