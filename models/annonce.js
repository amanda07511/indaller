'use strict';
module.exports = function(sequelize, DataTypes) {
  var Annonce = sequelize.define('Annonce', {
    user: DataTypes.INTEGER,
    domaine: DataTypes.INTEGER,
    titre: DataTypes.STRING,
    description: DataTypes.TEXT,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    ddd: DataTypes.DATE,
    ddf: DataTypes.DATE,
    etat: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Annonce.belongsTo(models.User, {foreignKey: 'user' });
        Annonce.belongsTo(models.Domaine, {foreignKey: 'domaine' });
        Annonce.hasMany(models.Candidat,{foreignKey: 'Candidat'})

      }
    }
  });
  return Annonce;
};