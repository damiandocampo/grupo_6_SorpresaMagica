'use strict';

const productsJSON = require('../../data/productos.json');

const products = productsJSON.map(productMap => {
  const product = {
    title: productMap.title,
    price: productMap.price,
    featured_product: productMap.destacado,
    discount: productMap.descuento,
    category_id: productMap.categoria,
    brand_id: productMap.marca_id,
    createdAt: new Date,
    updatedAt: new Date
  };
  return product;
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
