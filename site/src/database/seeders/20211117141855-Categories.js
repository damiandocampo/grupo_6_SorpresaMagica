'use strict';

const categoriesJSON = require('../../data/categorias.json');

const categories = categoriesJSON.map(categoryMap => {
  const category = {
    name: categoryMap.title,
    image: categoryMap.image,
    createdAt: new Date,
    updatedAt: new Date
  };
  return category;
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
