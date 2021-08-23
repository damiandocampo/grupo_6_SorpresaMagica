const express = require('express')
const app= express()
const path= require('path')

app.use(express.static('public'))

/*rutas */
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, 'views' ,'home.html' ))
})
app.get('/carrito',(req,res) => {
    res.sendFile(path.join(__dirname, 'views' ,'carritoDeCompras.html' ))
})

const port= 3030

app.listen(port, () => console.log(`puerto corriendo en http://localhost:${port}`))