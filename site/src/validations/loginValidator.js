const {body} = require ('express-validator')

const path = require('path')
const fs = require('fs')

const usuarios = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','users.json'),'utf-8'))

const bcryptjs = require('bcryptjs')


module.exports = [
    body('email')
    .custom((value,{req}) => {

        let usuarios = usuario.find(usuario => usuario.email === value && bcryptjs.compareSync(req.body.contraseña, usuario.contraseña))

        if(usuario){
            return true
        } else {
            return false
        }
    }).withMessage('Usuario inválido!')
]