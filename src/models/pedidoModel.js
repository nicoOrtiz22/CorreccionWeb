// Usamos un solo arreglo para almacenar objetos de pedido
let pedidos = []; 

/**
 * Guarda un objeto de pedido completo en el arreglo.
 * @param {Object} datosPedido - Objeto con nombre, tamaño, ingredientes, etc.
 */
function registrarPedido(datosPedido) {
    pedidos.push(datosPedido);
}

/**
 * Retorna la lista completa de pedidos.
 */
function obtenerPedido() {
    return pedidos;
}

// Exportamos con los nombres que espera el controlador
module.exports = { 
    registrarPedido, 
    obtenerPedido 
};
