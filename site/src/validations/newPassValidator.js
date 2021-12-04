const db = require('../database/models');

const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');


module.exports = [
    check('contraseña')
        .notEmpty().withMessage('El campo de contraseña actual no puede estar vacío.'),

    check('nuevaContraseña')
        .notEmpty().withMessage('El campo de contraseña no puede estar vacío.').bail()
        .isLength({min: 8}).withMessage('La nueva contraseña debe tener al menos 8 caracteres'),

    body('contraseña')
        .custom((value, {req}) => {

            return db.users.findOne({
                where: {
                    email: req.session.usuarioL.email
                }
            })

            .then(user => {
                if(!user || !bcrypt.compareSync(value, user.password)) {
                   return Promise.reject()
                }
            })

            .catch(() => {
                return Promise.reject("Contraseña incorrecta")
            })
        }),

    body('repetir')
        .custom((value, {req}) => {

            if(value !== req.body.nuevaContraseña) {
                return false
            } else {
                return true
            }

        }).withMessage('Las contraseñas no conciden'),
]