const db = require('../database/models');

const { check, body } = require('express-validator');
const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

module.exports = [
    check('nombre')
        .notEmpty().withMessage('El campo nombre no puede estar vacío.').bail()
        .isLength({min: 3}).withMessage('El nombre tiene que tener al menos 3 caracteres'),

    check('apellido')
        .notEmpty().withMessage('El campo apellido no puede estar vacío.').bail()
        .isLength({min: 3}).withMessage('El apellido tiene que tener al menos 3 caracteres'),

    check('email')
        .notEmpty().withMessage('El campo email no puede estar vacío.').bail()
        .isEmail().withMessage('Email inválido'),

    check('contraseña')
        .notEmpty().withMessage('El campo contraseña no puede estar vacío.').bail()
        .custom(value => {
            if(!regExPass.test(value)) {
                return false
            } else {
                return true
            }
        }).withMessage('La contraseña de tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial'),

    body('email')
        .custom(value => {

                return db.users.findOne({
                    where: {
                        email: value
                    }
                })

                .then(user => {
                    if(user) {
                        return Promise.reject('Este email ya está registrado')
                    }
                })
        
        }),

    check('imagen')
        .custom((value, {req}) => {

                if(!req.file) {
                    return true
                } else if (req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpeg') {
                    return true
                } else {
                    return false
                }

        }).withMessage('Por favor ingrese un archivo de imágen válido.'),

    body('repetir')
        .custom((value, {req}) => {

            if(value !== req.body.contraseña) {
                return false
            } else {
                return true
            }

        }).withMessage('La contraseña no concide'),
]
