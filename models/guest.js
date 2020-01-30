'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Guest extends Model {}

  Guest.init({
    name: DataTypes.STRING,
    total_room: DataTypes.INTEGER,
    checkout: DataTypes.BOOLEAN
  }, {
    sequelize
  })

  Guest.associate = function(models) {
    // associations can be defined here
    Guest.hasMany(models.Rating);
  };
  return Guest;
};