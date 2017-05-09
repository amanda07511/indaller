'use strict';
module.exports = function(sequelize, DataTypes) {
  var Experiance = sequelize.define('Experiance', {
    user: DataTypes.INTEGER,
    titre: DataTypes.STRING,
    enterprise: DataTypes.STRING,
    description: DataTypes.STRING,
    ville: DataTypes.INTEGER,
    ddd: DataTypes.DATE,
    ddf: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Experiance;
};