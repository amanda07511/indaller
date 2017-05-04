'use strict';
module.exports = function(sequelize, DataTypes) {
  var Enterprise = sequelize.define('Enterprise', {
    id: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    nom: DataTypes.STRING,
    domaine: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Enterprise;
};