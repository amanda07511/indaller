'use strict';
module.exports = function(sequelize, DataTypes) {
  var Candidat = sequelize.define('Candidat', {
    annonce: DataTypes.INTEGER,
    candidat: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Candidat.belongsTo(models.User, {foreignKey: 'candidat' });
        Candidat.belongsTo(models.Annonce, {foreignKey: 'annonce' });
        
      }
    }
  });
  return Candidat;
};