'use strict';
module.exports = function(sequelize, DataTypes) {
  var Domaine = sequelize.define('Domaine', {
    id: DataTypes.INTEGER,
    nom: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Domaine;
};