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
         User.hasMany(models.Annonce, {foreignKey: 'user' });
         User.hasMany(models.Candidat, {foreignKey: 'candidat' });
         User.hasMany(models.Rating, {foreignKey: 'de' });
         User.hasMany(models.Rating, {foreignKey: 'pour' });
         User.hasMany(models.Dossier, {foreignKey: 'user' });
      }
    }
  });
  return User;
};