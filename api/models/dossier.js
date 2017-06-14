'use strict';
module.exports = function(sequelize, DataTypes) {
  var Dossier = sequelize.define('Dossier', {
    user: DataTypes.INTEGER,
    titre: DataTypes.STRING,
    domaine: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Dossier.belongsTo(models.User, {foreignKey: 'user' });
        Dossier.belongsTo(models.Domaine, {foreignKey: 'domaine' });
      }
    }
  });
  return Dossier;
};