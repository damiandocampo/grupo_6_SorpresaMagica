const db = require('../database/models');

const { check, body } = require('express-validator');


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
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),

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

    body('repetir')
        .custom((value, {req}) => {

            if(value !== req.body.contraseña) {
                return false
            } else {
                return true
            }

        }).withMessage('Las contraseñas no conciden'),
]
