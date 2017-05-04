'use strict';
module.exports = function(sequelize, DataTypes) {
  var certificat = sequelize.define('certificat', {
    id: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    titre: DataTypes.STRING,
    certifiante: DataTypes.STRING,
    rendu: DataTypes.DATE,
    expiration: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return certificat;
};