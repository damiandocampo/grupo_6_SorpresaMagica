const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

// let usuarios = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','users.json'),'utf-8'));

const controller = {
    login: (req,res) => {

        db.Categories.findAll()

        .then(categories => {
            res.render('login',{categories});
        })
        
        .catch(err => {
            res.send(err)
        })
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

            const comparePassword = async (password, hash) => {
                try {
                    return await bcrypt.compare(password, hash);
                } catch (error) {
                    console.log(error);
                }

                return false;
            };

            const {email} =req.body

            db.users.findOne({
                where: {
                    email: email
                }
            })

            .then(usuario => {

                if (usuario && bcrypt.compare(req.body.contraseña.trim(), usuario.password)) {
                    
                    req.session.usuarioL = usuario

                    if (req.body.Recuerdame != undefined) {
                        res.cookie('Recuerdame', usuario.email, {maxAge: 8*60*60*1000})
                    }

                    return res.redirect('/')
                } 
            })
            .catch(error => console.log(error))

        } else {
            db.Categories.findAll()

            .then(categories => {
                res.render('login', {categories, errors: {msg: 'Email o constraseña inválidos.'}});
            })

            .catch(error => console.log(error))
        }          
    },

    registro: (req,res) => {
        db.Categories.findAll()

        .then(categories => {
            res.render('registro',{categories});
        })
        
        .catch(err => {
            res.send(err)
        })
    },

    register: (req,res) => {

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
    }
    },*/

    let errors = validationResult(req);
    
    if (errors.isEmpty()) {
        const {email} =req.body

        db.users.findOne({
            where: {
                email: email
            }

        })
        .then( usuario => {
            if (usuario && bcrypt.compareSync(req.body.contraseña.trim(), usuario.password)) {
                req.session.usuarioL = usuario

                if (req.body.Recuerdame != undefined) {
                    res.cookie('Recuerdame', usuario.email, {maxAge: 60*1000*30})
                }
                return res.redirect('/')
            } 
        })
        .catch(error => console.log(error))

    } else {
        db.Categories.findAll()

            .then(categories => {
                res.render('registro',{categories, errors: errors.mapped(), old: req.body});
            })

            .catch(error => console.log(error))
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
        db.Categories.findAll()

        .then(categories => {
            res.render('usuarioPerfil', {categories});
        })
        
        .catch(err => {
            res.send(err)
        })

    },

    editarDatos: (req, res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){

            db.users.update({
                first_name: req.body.nombre.trim(),
                last_name: req.body.apellido.trim(),
                email: req.body.email.trim(),
                password: req.body.nuevaContraseña? bcrypt.hashSync(req.body.nuevaContraseña, 10) : bcrypt.hashSync(req.body.contraseña, 10),
                image: req.file ? req.file.filename : 'default-image.png'
            },{
                where: {email: req.body.email}
            })

            .then(user => {
                res.redirect("/users/perfil")
            })

            .catch(err => {
                res.send(err)
            })

        } else {
            db.Categories.findAll()

            .then(categories => {
                res.render('usuarioPerfil',{categories, errors: errors.mapped()});
            })
            
            .catch(err => {
                res.send(err)
            })
        }
    },

    carrito: (req,res) => {
        db.Categories.findAll()

        .then(categories => {
            res.render('carritoDeCompras',{categories, errors: errors.mapped()});
        })
        
        .catch(err => {
            res.send(err)
        })
    },
}

module.exports = controller;
