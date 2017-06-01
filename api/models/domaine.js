'use strict';
module.exports = function(sequelize, DataTypes) {
  var Domaine = sequelize.define('Domaine', {
    nom: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Domaine.hasMany(models.Enterprise, {foreignKey: 'domaine' });
        Domaine.hasMany(models.Formation, {foreignKey: 'domaine' });
      }
    }
  });
  return Domaine;
};