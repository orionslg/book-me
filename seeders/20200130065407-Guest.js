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
        name: "Orion",
        total_room: 5,
        checkout: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ulrich",
        total_room: 10,
        checkout: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

        return queryInterface.bulkInsert('Guests', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Guests', null, {});
  }
};
