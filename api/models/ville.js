'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ville = sequelize.define('Ville', {
    ville_departement: DataTypes.STRING,
    ville_nom: DataTypes.STRING,
    ville_nom_simple: DataTypes.STRING,
    ville_nom_reel: DataTypes.STRING,
    ville_code_postal: DataTypes.STRING,
    ville_longitude_deg: DataTypes.FLOAT,
    ville_latitude_deg: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        Ville.hasMany(models.User, {foreignKey: 'ville_id' });
        Ville.hasMany(models.Formation, {foreignKey: 'ville' });
        Ville.hasMany(models.Experiance, {foreignKey: 'ville' });
      }
    }
  });
  return Ville;
};