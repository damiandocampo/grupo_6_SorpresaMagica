'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('rols', 
    [
      {
      id: 1,
      name: 'admin',
      createdAt : new Date,
      updatedAt : new Date
      },
      {
      id: 2,
      name: 'user',
      createdAt : new Date,
      updatedAt : new Date
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('rols', null, {});
     
  }
};
