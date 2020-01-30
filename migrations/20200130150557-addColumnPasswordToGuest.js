'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Guests', 'password', Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Guests', 'password');
  }
};
