'use strict';

const bcrypt = require('bcryptjs')

const users = require('../../data/users.json')

const usuarios = users.map(usuario => {
  const objeto = {
    first_name: usuario.nombre.trim(),
    last_name: usuario.apellido.trim(),
    email: usuario.email.trim(),
    password: usuario.contraseña,
    image: usuario.imagen,
    rolId: usuario.rol,
    createdAt: new Date,
    updatedAt: new Date
}
return objeto
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', usuarios,  {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('users', null, {});
     
  }
};


