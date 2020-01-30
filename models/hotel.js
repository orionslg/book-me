'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Hotel extends Model {}

  Hotel.init({
    name: DataTypes.STRING,
    room_stock: DataTypes.INTEGER,
    address: DataTypes.STRING,
    price: DataTypes.INTEGER
  },
  {
    sequelize
  })

  Hotel.associate = function(models) {
    // associations can be defined here
    Hotel.hasMany(models.Rating);
  };
  return Hotel;
};