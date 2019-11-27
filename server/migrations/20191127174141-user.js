'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
      .then(() => {
        return queryInterface.createTable('user',       {
          "id": {
              "type": "VARCHAR(255)",
              "primaryKey": true,
              "field": "id"
          },
          "username": {
              "type": "VARCHAR(255)",
              "field": "username"
          },
          "password": {
              "type": "VARCHAR(255)",
              "field": "password"
          },
          "email": {
              "type": "VARCHAR(255)",
              "field": "email"
          },
          "firstName": {
              "type": "VARCHAR(255)",
              "field": "first_name"
          },
          "lastName": {
              "type": "VARCHAR(255)",
              "field": "last_name"
          },
          "gender": {
              "type": "VARCHAR(255)",
              "field": "gender"
          },
          "avatar": {
              "type": "VARCHAR(255)",
              "field": "avatar"
          },
          "flag": {
              "type": "CHAR(255)",
              "field": "flag"
          }
      })
      })

      .then(() => {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
      .then(() => {
        return queryInterface.dropTable('user');
      })
      .then(() => {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      });
  }
};
