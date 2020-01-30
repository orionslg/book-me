'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Rating extends Model {}

  Rating.init({
    HotelId: DataTypes.INTEGER,
    GuestId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {
    sequelize
  })

  Rating.associate = function(models) {

    Rating.belongsTo(models.Hotel);
    Rating.belongsTo(models.Guest);

  };
  return Rating;
};