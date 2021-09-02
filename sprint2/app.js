const express = require('express')
const app= express()
const path= require('path')

app.use(express.static('public'))


/*rutas */

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, 'views' ,'home.html' ))
})

app.get('/carritoDeCompras.html',(req,res) => {
    res.sendFile(path.join(__dirname, 'views' ,'carritoDeCompras.html' ))
})

app.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname, 'views' ,'login.html' ))
})

app.get('/registro',(req,res) => {
    res.sendFile(path.join(__dirname, 'views' ,'registro.html' ))
})

app.get('/detalle',(req,res) => {
    res.sendFile(path.join(__dirname, 'views' ,'detalleDeProductos.html' ))
})


const port= 3030

app.listen(port, () => console.log(`puerto corriendo en http://localhost:${port}`))