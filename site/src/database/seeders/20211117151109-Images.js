'use strict';

const products = require('../../data/productos.json');

const images = products.map(product => {
  const image = {
    file: product.image,
    product_id: 1,
    createdAt: new Date,
    updatedAt: new Date
  };
  return image;
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Images', images, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Images', null, {});
  }
};

