'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      const data = [
        {
          HotelId: 1,
          GuestId: 1,
          rating: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          HotelId: 2,
          GuestId: 2,
          rating: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

        return queryInterface.bulkInsert('Ratings', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Ratings', null, {});
  }
};
