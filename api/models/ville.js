'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ville = sequelize.define('Ville', {
    id: DataTypes.INTEGER,
    nom: DataTypes.STRING,
    cp: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Ville;
};