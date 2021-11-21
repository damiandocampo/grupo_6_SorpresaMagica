const { check } = require('express-validator');

// Validator
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
    check('contraseña')
        .notEmpty().withMessage('El campo contraseña es requerido').bail()
        .equals(locals.usuarioL.password).withMessage('La contraseña no coincide.').bail()
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('nuevaContraseña')
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres')
        .optional({ checkFalsy: true }),
    check('repetir')
        .equals(req.body.nuevaContraseña).withMessage('La contraseña no coincide.').bail()
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres')
        .optional({ checkFalsy: true }),
]
