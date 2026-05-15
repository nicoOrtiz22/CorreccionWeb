let nombreCliente = []
let pizzaSize = []
let ingredientesPizza = []
let cantidadPizzas = []
let pedido = []

function guardarPedido(nombre, size, ingredientes, cantidad){
    nombreCliente.push(nombre);
    pizzaSize.push(size);
    ingredientesPizza.push(ingredientes);
    cantidadPizzas.push(cantidad);
}

function obtenerPedido(){
    return pedido;
}

module.exports = {guardarPedido, obtenerPedido};
