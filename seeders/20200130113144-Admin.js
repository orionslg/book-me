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
          username: "orionslg",
          email: "orionslg@bookme.com",
          password: "123456",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "uulwake",
          email: "uulwake@bookme.com",
          password: "123456",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

        return queryInterface.bulkInsert('Admins', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Admins', null, {});
  }
};
