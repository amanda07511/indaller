'use strict';
module.exports = function(sequelize, DataTypes) {
  var Rating = sequelize.define('Rating', {
    de: DataTypes.INTEGER,
    pour: DataTypes.INTEGER,
    rating: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        Rating.belongsTo(models.User, {as: 'De', foreignKey: 'de' });
        Rating.belongsTo(models.User, {as: 'Pour', foreignKey: 'pour'});
      }
    }
  });
  return Rating;
};