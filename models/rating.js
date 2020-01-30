'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Rating extends Model { }

  Rating.init({
    HotelId: {
      type: DataTypes.INTEGER,
      validate: {
        maxRoom(value, next) {
          let hotelFindOne;
          const Hotel = sequelize.models.Hotel;
          const Guest = sequelize.models.Guest;
          Hotel.findOne({
            where: {
              id: value
            }
          })
            .then(hotel => {
              hotelFindOne = hotel;
              return Guest.findOne({
                where: {
                  id: this.GuestId
                }
              })
            })
            .then(guest => {
              if (guest.total_room > hotelFindOne.room_stock) {
                Guest.destroy({
                  where: {
                    id: guest.id
                  }
                })
                  .then(data => {
                    next('Room is not enough');
                  })
                  .catch(err => {
                    console.log(err);
                    next(err);
                  })
              } else {
                next();
              }
            })
            .catch(err => {
              next(err);
            })
        }
      }
    },
    GuestId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {
    sequelize
  })

  Rating.associate = function (models) {

    Rating.belongsTo(models.Hotel);
    Rating.belongsTo(models.Guest);

  };
  return Rating;
};