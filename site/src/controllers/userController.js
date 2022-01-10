const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const controller = {
    login: (req,res) => {

        const categories = db.Categories.findAll()

        const brands = db.Brands.findAll()

        Promise.all([categories, brands])

        .then(([categories, brands]) => {
            res.render('login',{categories, brands});
        })
        
        .catch(err => {
            res.send(err)
        })
    },

    logear: (req, res) => {

        let errors = validationResult(req);
    
        if (errors.isEmpty()) {

            const {email, recuerdame} = req.body

            db.users.findOne({
                where: {
                    email: email
                }
            })

            .then(usuario => {

                req.session.usuarioL = usuario;

                if(recuerdame) {
                    res.cookie('Sorpresa magica', req.session.usuarioL, {maxAge: 24*60*60*1000})
                }

                return res.redirect('/')
                
            })

            .catch(error => {
                res.send(error)
            })

        } else {
            const categories = db.Categories.findAll()

            const brands = db.Brands.findAll()

            Promise.all([categories, brands])

            .then(([categories, brands]) => {
                res.render('login', {categories, brands, errors: errors.mapped()});
            })

            .catch(error => {
                res.send(error)
            })
        }          
    },

    registro: (req, res) => {
        const categories = db.Categories.findAll()

        const brands = db.Brands.findAll()

        Promise.all([categories, brands])

        .then(([categories, brands]) => {
            res.render('registro',{categories, brands});
        })
        
        .catch(err => {
            res.send(err)
        })
    },

    register: (req,res) => {

        let errors = validationResult(req);
        
        if (errors.isEmpty()) {

            db.users.create({
                first_name: req.body.nombre,
                last_name: req.body.apellido,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.contraseña, 10),
                image: req.file ? req.file.filename : 'default-image.png',
                rolId: 2
            })

            .then( usuario => {
                res.redirect('/users/login') 
            })

            .catch(error => console.log(error))

        } else {
            const categories = db.Categories.findAll()

            const brands = db.Brands.findAll()

            Promise.all([categories, brands])

            .then(([categories, brands]) => {
                res.render('registro',{categories, brands, errors: errors.mapped(), old: req.body});
            })

            .catch(error => console.log(error))
        }
    },

    logout: (req, res) => {

        req.session.destroy();

        if(req.cookies.recuerdame) {
            res.cookie('Sorpresa magica', '', {maxAge: -1});
        };

        res.redirect('/');
    },

    perfil: (req, res) => {

        const categories = db.Categories.findAll()

        const brands = db.Brands.findAll()

        Promise.all([categories, brands])

        .then(([categories, brands]) => {
            res.render('usuarioPerfil', {categories, brands});
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
                password: req.session.usuarioL.password,
                image: req.session.usuarioL.image,
                rolId: req.session.usuarioL.rolId
            },{
                where: {email: req.session.usuarioL.email}
            })

            .then(result => {
                
                db.users.findOne({
                    where: {
                        email: req.session.usuarioL.email
                    }
                })
    
                .then(usuario => {
                    req.session.usuarioL = usuario;
                    return res.redirect('/users/perfil');
                })

                .catch(err => {
                    res.send(err)
                })
            })

            .catch(err => {
                res.send(err)
            })

        } else {
            const categories = db.Categories.findAll()

            const brands = db.Brands.findAll()

            Promise.all([categories, brands])

            .then(([categories, brands]) => {
                res.render('usuarioPerfil',{categories, brands, errors: errors.mapped(), old: req.body});
            })
            
            .catch(err => {
                res.send(err)
            })
        }
    },

    newPass: (req, res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){

            db.users.update({
                first_name: req.session.usuarioL.first_name,
                last_name: req.session.usuarioL.last_name,
                email: req.session.usuarioL.email,
                password: bcrypt.hashSync(req.body.nuevaContraseña, 10),
                image: req.session.usuarioL.image,
                rolId: req.session.usuarioL.rolId
            },{
                where: {email: req.session.usuarioL.email}
            })

            .then(user => {
                res.redirect("/users/logout")
            })

            .catch(err => {
                res.send(err)
            })

        } else {
            const categories = db.Categories.findAll()

            const brands = db.Brands.findAll()

            Promise.all([categories, brands])

            .then(([categories, brands]) => {
                res.render('usuarioPerfil',{categories, brands, errors: errors.mapped()});
            })
            
            .catch(err => {
                res.send(err)
            })
        }
    },
}

module.exports = controller;
