const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const { where } = require('sequelize/types');

let usuarios = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','users.json'),'utf-8'));

const controller = {
    login: (req,res) => {
        res.render('login');
    },

    logear: (req,res) => {
        const usuario = usuarios.find(usuario => usuario.email === req.body.email);

        if (usuario && bcrypt.compareSync(req.body.contraseña, usuario.contraseña)) {
            req.session.usuarioL = usuario;

            if (req.body.Recuerdame != undefined) {
                res.cookie('Recuerdame', usuario.email, {maxAge: 60*1000*30});
            };

            res.redirect('/');

        } else {
            res.render('login', {errors: {msg: 'Email o constraseña inválidos.'}});
        }
    },

    registro: (req,res) => {
         res.render('registro')
    },

    registre: (req,res) => {

        const errors = validationResult(req);

        if(errors.isEmpty()){
            const {nombre, apellido, email, contraseña} = req.body;
            let usuario = {
                id: usuarios[usuarios.length - 1].id + 1,
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                email: email.trim(),
                contraseña: bcrypt.hashSync(contraseña, 10),
                imagen: req.file ? req.file.filename : 'default-image.png',
                rol: 'Usuario'
            }
            usuarios.push(usuario)
            fs.writeFileSync(path.join(__dirname, "..", "data", "users.json"),JSON.stringify(usuarios, null, 2), 'utf-8')

            res.redirect("/users/login")
        } else {
            res.render('registro',{errors: errors.mapped(), old: req.body});
        }
    },

    logout: (req, res) => {

        req.session.destroy();

        if (req.cookies.Recuerdame !== undefined) {
            res.cookie('Recuerdame', '', {maxAge: -1});
        };

        res.redirect('/');
    },

    perfil: (req, res) => {
        res.render('usuarioPerfil');
    },

    editarDatos: (req, res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){

            db.Users.update({
                name: req.body.nombre.trim(),
                last_name: req.body.apellido.trim(),
                email: req.body.email.trim(),
                password: bcrypt.hashSync(req.body.nuevaContraseña, 10),
                image: req.file ? req.file.filename : 'default-image.png',
                rol: 'Usuario'
            },{
                where: {email: locals.usuarioL.email}
            })

            .then(user => {
                res.redirect("/users/perfil")
            })

            .catch(err => {
                res.send(err)
            })

        } else {
            res.render('usuarioPerfil',{errors: errors.mapped()});
        }
    },

    carrito: (req,res) => {
        res.render('carritoDeCompras');
    },
}

module.exports = controller;
