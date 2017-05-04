'use strict';
module.exports = function(sequelize, DataTypes) {
  var Candidat = sequelize.define('Candidat', {
    annonce: DataTypes.INTEGER,
    candidat: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Candidat;
};