'use strict';
module.exports = function(sequelize, DataTypes) {
  var Formation = sequelize.define('Formation', {
    user: DataTypes.INTEGER,
    ecole: DataTypes.STRING,
    domaine: DataTypes.INTEGER,
    diplome: DataTypes.STRING,
    ville: DataTypes.INTEGER,
    ddd: DataTypes.DATE,
    ddf: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Formation.belongsTo(models.Ville, {foreignKey: 'ville' });
        Formation.belongsTo(models.Domaine, {foreignKey: 'domaine' });
      }
    }
  });
  return Formation;
};