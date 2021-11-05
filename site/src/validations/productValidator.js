const { check } = require('express-validator')

module.exports = [
    check('title')
        .notEmpty().withMessage('El nombre del producto es requerido.').bail()
        .isLength({min: 3}).withMessage('El nombre del producto debe tener al menos 3 caracteres.'),
    check('marca')
        .notEmpty().withMessage('La marca es requerida.').bail()
        .isLength({min: 3}).withMessage('La marca debe tener al menos 3 caracteres.'),
    check('price')
        .notEmpty().withMessage('El precio es requerido.').bail()
        .isInt().withMessage('El precio del producto debe ser un número.'),
    check('descuento')
        .isInt().withMessage('El descuento debe ser un número.')
        .optional({ checkFalsy: true }),
    check('categoria')
        .notEmpty().withMessage('Debes seleccionar una categoría.'),
    check('destacado')
        .notEmpty().withMessage('Debes aclarar si es un producto destacado.'),
]
