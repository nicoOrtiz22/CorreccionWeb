const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidoController')

router.post('/pedidos',controller.registrarPedido);

router.get('/ver-pedidos', controller.listarPedido);

module.exports = router;