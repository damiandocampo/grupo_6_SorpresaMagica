const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

let usuarios = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','users.json'),'utf-8'));

const db = require('../database/models')

const controller = {
    login: (req,res) => {
        res.render('login');
    },

    logear: (req,res) => {
        /*const usuario = usuarios.find(usuario => usuario.email === req.body.email);

        if (usuario && bcrypt.compareSync(req.body.contraseña, usuario.contraseña)) {
            req.session.usuarioL = usuario;

            if (req.body.Recuerdame != undefined) {
                res.cookie('Recuerdame', usuario.email, {maxAge: 60*1000*30});
            };

            res.redirect('/');

        } else {
            res.render('login', {errors: {msg: 'Email o constraseña inválidos.'}});
        }*/

        let errors = validationResult(req);
    
        if (errors.isEmpty()) {
            const {email} =req.body

            db.User.findOne({
                where: {
                    email
                }

            })
            .then( usuario => {
                if (usuario && bcrypt.compareSync(req.body.contraseña, usuario.contraseña)) {
                    req.session.usuarioL = usuario

                    if (req.body.Recuerdame != undefined) {
                        res.cookie('Recuerdame', usuario.email, {maxAge: 60*1000*30})
                    }
                    return res.redirect('/')
                } 
            })
            .catch(error => console.log(error))

        } else {
            res.render('login', {errors: {msg: 'Email o constraseña inválidos.'}});
        }          
    },

    registro: (req,res) => {
         res.render('registro')
    },

    registre: (req,res) => {

        /*const errors = validationResult(req);

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
    },*/

        let errors = validationResult(req);

        if(errors.isEmpty()){
            const {nombre, apellido, email, contraseña} = req.body;

            db.User.create({
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                email: email.trim(),
                contraseña: bcrypt.hashSync(contraseña, 10),
                imagen: 'default-image.png',
                rolId: 'Usuario'
            })

            .then(user => {
                req.session.usuarioL = {
                    id: user.id,
                    name : user.nombre,
                    image : user.image,
                    rolId : user.rolId
                }
                return res.redirect('/users/login')
            })
            .catch(error => console.log(error))

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
        const usuario = usuarios.find(usuario => usuario.email === local.usuarioL.email);
        const { imagen } = req.body;
        if(usuario) {
            usuario.imagen = imagen;
            fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));
            res.redirect('/users/perfil');
        }else{
            res.redirect('/users/perfil', {errors: errors.mapped()});
        }
    },

    carrito: (req,res) => {
        res.render('carritoDeCompras');
    },
}

module.exports = controller;
