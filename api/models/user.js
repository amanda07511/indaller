'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    prenom: DataTypes.STRING,
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tel: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    ville_id: DataTypes.INTEGER,
    ddn: DataTypes.DATE,
    etat: DataTypes.BOOLEAN,
    type: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
         User.hasMany(models.Enterprise, {foreignKey: 'user' });
         User.belongsTo(models.Ville, {foreignKey: 'ville_id' });
      }
    }
  });
  return User;
};