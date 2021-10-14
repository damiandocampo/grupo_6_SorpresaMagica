const fs = require ('fs')
const path = require('path')


const userAccess = (req,res,next) => {
    fs.appendFileSync(path.join(__dirname, '../logs/userLogs.txt'), 'El usuario ingresó a ' + req.url, 'utf-8')
    next()
}


module.exports = userAccess 