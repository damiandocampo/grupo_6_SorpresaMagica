'use strict';

const brandsArray = ["Milka", "Pepitos", "Terrabusi", "Bon o Bon", "Butter Toffees", "Arcor", "Halls", "Topline", "Beldent", "Cadbury", "M&Ms", "Mr.Pop's", "Flynn Paff", "Rocklets", "Mogul", "Billiken", "Cofler"];

const brands = brandsArray.map(brandMap => {
  const brand = {
    name: brandMap,
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
