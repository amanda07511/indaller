'use strict';
module.exports = function(sequelize, DataTypes) {
  var Formation = sequelize.define('Formation', {
    user: DataTypes.INTEGER,
    ecole: DataTypes.STRING,
    domaine: DataTypes.INTEGER,
    diplome: DataTypes.STRING,
    ville: DataTypes.INTEGER,
    ddd: DataTypes.DATE,
    ddf: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Formation;
};