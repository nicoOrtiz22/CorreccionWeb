const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidoController')

router.post('/',controller.registrarPedido);

router.get('/ver', controller.listarPedido);

module.exports = router;