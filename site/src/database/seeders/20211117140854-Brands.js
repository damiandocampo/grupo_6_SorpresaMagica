'use strict';

const products = require('../../data/productos.json');

const brands = products.map(product => {
  const brand = {
    name: product.marca,
    createdAt: new Date,
    updatedAt: new Date
  };
  return brand;
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Brands', brands, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Brands', null, {});
  }
};
