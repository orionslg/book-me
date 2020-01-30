'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Hotel extends Model {}

  Hotel.init({
    name: DataTypes.STRING,
    room_stock: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: 1000,
          msg: 'Cannot exceed 1000 rooms'
        },
        min: {
          args: 1,
          msg: 'Hotel must has a room'
        }
      }
    },
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