'use strict';
module.exports = function(sequelize, DataTypes) {
  var Annonce = sequelize.define('Annonce', {
    user: DataTypes.INTEGER,
    domaine: DataTypes.INTEGER,
    titre: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    ddd: DataTypes.DATE,
    ddf: DataTypes.DATE,
    etat: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Annonce;
};