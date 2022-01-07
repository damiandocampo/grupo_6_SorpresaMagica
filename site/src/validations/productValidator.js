const { check } = require('express-validator')

module.exports = [
    check('title')
        .notEmpty().withMessage('El nombre del producto es requerido.').bail()
        .isLength({min: 5}).withMessage('El nombre del producto debe tener al menos 5 caracteres.'),
    check('marca')
        .notEmpty().withMessage('La marca es requerida.').bail()
        .isLength({min: 3}).withMessage('La marca debe tener al menos 3 caracteres.'),
    check('price')
        .notEmpty().withMessage('El precio es requerido.').bail()
        .isDecimal().withMessage('El precio del producto debe ser un número.'),
    check('descuento')
        .isInt().withMessage('El descuento debe ser un número.')
        .optional({ checkFalsy: true }),
    check('categoria')
        .notEmpty().withMessage('Debes seleccionar una categoría.'),
    check('destacado')
        .isInt().withMessage('Debes aclarar si es un producto destacado.'),
    check('descripcion')
        .notEmpty().withMessage('La descripción del producto es requerida.').bail()
        .isLength({min: 20}).withMessage('La descripción del producto debe tener al menos 20 caracteres.'),
    check('image')
        .custom((value, {req}) => {

                if(!req.file) {
                    return true
                } else if (req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpeg') {
                    return true
                } else {
                    return false
                }

        }).withMessage('Por favor ingrese un archivo de imágen válido.'),
]
