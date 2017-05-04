'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    prenom: DataTypes.STRING,
    nom: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
    tel: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    ville: DataTypes.INT,
    ddn: DataTypes.DATE,
    etat: DataTypes.BOOLEAN,
    type: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};