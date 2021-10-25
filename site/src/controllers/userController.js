const path = require('path')
const fs = require('fs')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

let usuarios = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','users.json'),'utf-8'));


const controller = {
    login: (req,res) => {
        res.render('login');
    },


    registro: (req,res) => {
         res.render('registro')
    },

    registre: (req,res) => {
         let errors = validationResult(req)
        if(errors.isEmpty()){
            const {Nombre, Apellido, email, image, contraseña, repetir} = req.body
            let usuario = {
                id: usuarios[usuarios.length - 1].id + 1, //usuarios.lenght,
                nombre: Nombre.trim(),
                apelido: Apellido.trim(),
                email: email.trim(),
                contraseña : bcrypt.hashSync(contraseña, 10),
                repetir : bcrypt.hashSync(repetir, 10),
                imagen: req.file ? req.file.filename : 'default-image.png'
            }
            usuarios.push(usuario)
            fs.writeFileSync(path.join(__dirname, "..", "data", "users.json"),JSON.stringify(usuarios, null, 2), 'utf-8')

  return res.redirect("/users/login")
        } else {
            return res.render('registro',{
                errors : errors.mapped()
            })
        }
       
  
  },


    carrito: (req,res) => {
        res.render('carritoDeCompras');
    },
}

module.exports = controller;