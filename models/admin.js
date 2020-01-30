'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;

  class Admin extends Model {}

  Admin.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validation: {
        isEmail: {
          args: true,
          msg: 'Your email is invalid'
        }
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize
  })

  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};