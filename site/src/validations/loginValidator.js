const db = require('../database/models');

const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');

module.exports = [
    check('email')
        .notEmpty().withMessage('El campo email no puede estar vacío.').bail()
        .isEmail().withMessage('Es necesario ingresar un email válido.'),

    body('email')
        .custom((value) => {
            
            return db.users.findOne({
                where: {
                    email: value
                }
            })

            .then(user =>{
                if(!user) {
                    return Promise.reject()
                }
            })

            .catch(() => {
                return Promise.reject('El usuario no está registrado')
            })
        }),

    body('password')
        .custom((value, {req}) => {

            return db.users.findOne({
                where: {
                    email: req.body.email
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
        })
]