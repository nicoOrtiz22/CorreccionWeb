let pedidos = []; 
let totalAcumulado = 0;

/**
 * 
 * @param {Object} datosPedido 
 */
function registrarPedido(datosPedido) {
    pedidos.push(datosPedido);
    totalAcumulado += datosPedido.precioTotal;
}


function obtenerPedido() {
    return pedidos;
}

function obtenerTotalAcumulado(){
    return totalAcumulado;
}

module.exports = { 
    registrarPedido, 
    obtenerPedido,
    obtenerTotalAcumulado
};
