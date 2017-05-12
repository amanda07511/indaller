'use strict';
module.exports = function(sequelize, DataTypes) {
  var Enterprise = sequelize.define('Enterprise', {
    user: DataTypes.INTEGER,
    nom: DataTypes.STRING,
    domaine: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Enterprise.belongsTo(models.User, {foreignKey: 'user' });
        Enterprise.belongsTo(models.Domaine, {foreignKey: 'domaine'});
      }
    }
  });
  return Enterprise;
};