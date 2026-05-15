let pedidos = []; 

/**
 * 
 * @param {Object} datosPedido 
 */
function registrarPedido(datosPedido) {
    pedidos.push(datosPedido);
}


function obtenerPedido() {
    return pedidos;
}

module.exports = { 
    registrarPedido, 
    obtenerPedido 
};
