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
        name: "Budi",
        total_room: 5,
        checkout: false,
        email: "budi@bookme.com",
        password: "budi123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cici",
        total_room: 10,
        checkout: true,
        email: "cici@bookme.com",
        password: "cici123",
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
