'use strict';

const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        first_name: nombre.trim(),
        last_name: apellido.trim(),
        email: email.trim(),
        password: bcrypt.hashSync(contraseña, 10),
        image: 'default-image.png',
        rolId: 1,
        createdAt: new Date,
        updatedAt: new Date
    }
  ],  {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('users', null, {});
     
  }
};


