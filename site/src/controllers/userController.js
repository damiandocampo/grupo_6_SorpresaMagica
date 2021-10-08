const path = require('path')
const fs = require('fs')

let usuarios = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','users.json'),'utf-8'));


const controller = {
    login: (req,res) => {
        res.render('login');
    },


    registro: (req,res) => {
         res.render('registro')
    },

    registre: (req,res) => {
        const {nombre, apellido, email, contraseña, repetir} = req.body

  let usuario = {
    id: usuarios[usuarios.length - 1].id + 1, //usuarios.lenght,
    nombre: nombre.trimp(),
    apelido: apellido.trimp(),
    email: email.trimp(),
    contraseña,
    repetir,
  }
  usuarios.push(usuario)

  fs.writeFileSync(path.join(__dirname, "..", "data", "users.json"),JSON.stringify(usuarios, null, 2), 'utf-8')

  return res.redirect("/users/login")
  },


    carrito: (req,res) => {
        res.render('carritoDeCompras');
    },
}

module.exports = controller;