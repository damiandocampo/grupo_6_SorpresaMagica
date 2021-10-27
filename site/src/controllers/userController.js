const path = require('path')
const fs = require('fs')


const {validationResult} = require('express-validator')

let usuarios = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','users.json'),'utf-8'));


const controller = {
    login: (req,res) => {
        res.render('login');
    },

    logear: (req,res) => {
        
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            const{email} = req.body

            let usuario = usuarios.find(usuario => usuario.email === email)
            req.session.usuarioLogin = {
                id: usuario.id,
                nombre: usuario.nombre,
                //rol: usuario.rol
            }

            return res.redirect('/')

        } else {
            return res.render('login')

            errores: errors.mapped()
        }

    },

    
    registro: (req,res) => {
         res.render('registro')
    },

    registre: (req,res) => {


        /*let errors = validationResult(req)

        if(errors.isEmpty()){
            const {nombre, apellido, email, contraseña, repetir} = req.body

            let usuario = {
                id: usuarios[usuarios.length - 1].id + 1, //usuarios.lenght,
                nombre: nombre.trimp(),
                apelido: apellido.trimp(),
                email: email.trimp(),
                contraseña : bcryptjs.hashSync(contraseña, 10),
                repetir : bcryptjs.hashSync(repetir, 10),
            }
            usuarios.push(usuario)
        } else {
            return res.render('registro',{
                errors : errors.mapped()
            })
        }*/

        const {nombre, apellido, email, contraseña, repetir} = req.body
        
        let usuario = {
            id: usuarios[usuarios.length - 1].id + 1, //usuarios.lenght,
            nombre: nombre.trimp(),
            apelido: apellido.trimp(),
            email: email.trimp(),
            contraseña, //bcryptjs.hashSync(contraseña, 10),
            repetir, //bcryptjs.hashSync(repetir, 10),
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





