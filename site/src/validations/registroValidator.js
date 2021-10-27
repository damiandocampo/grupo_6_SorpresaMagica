const {check, body} = require('express-validator');

module.exports = [

    check('nombre')
    .notEmpty().withMessage('Se requiere un nombre'),

    check('apellido')
    .notEmpty().withMessage('Se requiere un apellido'),

    check('email')
    .isEmail().withMessage('Tiene que ingresar un email válido'),

    check('contraseña')
    .isLength({
        max : 10,
        min : 6
    }).withMessage('La contraseña debe tener un mínimo de 6 carácteres'),

    body('repite')
    .custom((value,{req}) => {
        if(value !== req.body.contraseña){
            return false
        }
        return true
    }).withMessage('La contraseña no coincide')

]