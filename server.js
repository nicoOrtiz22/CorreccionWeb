const express = require('express');
const app = express();
const PORT =3000;
const pedidoRoutes = require('./src/routes/pedidoRoutes')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/pedidos', pedidoRoutes)
app.listen(PORT,()=>{
    console.log("servidor corriendo ")
})