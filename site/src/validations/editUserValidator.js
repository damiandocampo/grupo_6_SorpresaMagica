const db = require('../database/models');

const { check, body } = require('express-validator');

module.exports = [
    check('nombre')
        .notEmpty().withMessage('El campo nombre es requerido').bail()
        .isLength({min: 3}).withMessage('El nombre tiene que tener al menos 3 caracteres'),

    check('apellido')
        .notEmpty().withMessage('El campo apellido es requerido').bail()
        .isLength({min: 3}).withMessage('El apellido tiene que tener al menos 3 caracteres'),

    check('email')
        .notEmpty().withMessage('El campo email es requerido').bail()
        .isEmail().withMessage('Email inválido'),

    body('email')
        .custom((value, {req}) => {

            return db.users.findAll()

            .then(users => {
                
                var validacion = [];

                users.forEach(user => {

                    if(value === user.email && value !== req.session.usuarioL.email) {
                        //si el email ingresado está en la bbdd y es NO es el actual, no hacer el update
                        validacion.push('repetido')

                    } else if(value !== user.email || value === req.session.usuarioL.email) {
                        //si el email ingresado NO está en la bbdd o no se modificó, hacer el update
                        validacion.push('unico')
                    }

                })

                if(validacion.includes('repetido')) {
                    return Promise.reject('Este email ya está registrado.')
                }

            })
        
        }),
]
