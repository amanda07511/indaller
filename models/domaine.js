'use strict';
module.exports = function(sequelize, DataTypes) {
  var Domaine = sequelize.define('Domaine', {
    nom: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Domaine.hasMany(models.Enterprise, {foreignKey: 'domaine' });
        Domaine.hasMany(models.Formation, {foreignKey: 'domaine' });
        Domaine.hasMany(models.Annonce, {foreignKey: 'domaine' });
        Domaine.hasMany(models.Dossier, {foreignKey: 'domaine' });
      }
    }
  });
  return Domaine;
};