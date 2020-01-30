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
        name: "Grand Sahid",
        room_stock: 100,
        address: "Sudirman 1",
        price: 1e6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Le Meridian",
        room_stock: 50,
        address: "Sudirman 2",
        price: 0.5e6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Hotels', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Hotels', null, {});
  }
};
