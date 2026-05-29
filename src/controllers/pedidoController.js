
const pedidoModel = require('../models/pedidoModel');

function registrarPedido(req, res) {
    const {
        nombre,
        tamañopizza,
        cantidadpizzas,
        ingrediente_jamon,
        ingrediente_quesoext,
        ingrediente_champ,
        ingrediente_cebolla,
        ingrediente_aceituna,
        ingrediente_tocino,
        ingrediente_pimenton
    } = req.body;

    const ingredientes = [
        ingrediente_jamon, ingrediente_quesoext, ingrediente_champ,
        ingrediente_cebolla, ingrediente_aceituna, ingrediente_tocino,
        ingrediente_pimenton
    ].filter(ing => ing !== undefined);

    let precioBase = 0;
    let valorIngredienteExtra = 0;

    if (tamañopizza === "Chica") {
        precioBase = 3990;
        valorIngredienteExtra = 500;
    } else if (tamañopizza === "Mediana") {
        precioBase = 5990;
        valorIngredienteExtra = 800;
    } else if (tamañopizza === "Grande") {
        precioBase = 8490;
        valorIngredienteExtra = 1200;
    }

    const limiteIngredientesBase = 3;
    const extras = ingredientes.length > limiteIngredientesBase
        ? ingredientes.length - limiteIngredientesBase
        : 0;

    const cantidad = parseInt(cantidadpizzas) || 1;
    
    const precioUnitario = precioBase + (extras * valorIngredienteExtra);
    const precioTotal = precioUnitario * parseInt(cantidadpizzas);


    pedidoModel.registrarPedido({
        nombre: nombre || "Cliente anonimo",
        tamañopizza: tamañopizza || "no especificado",
        ingredientes: ingredientes,
        cantidadpizzas: cantidad,
        precioUnitario: precioUnitario,
        precioTotal: precioTotal
    });

    res.redirect('/pedidos/ver');

}

function listarPedido(req, res) {
    const pedido = pedidoModel.obtenerPedido();
    const totalAcumulado = pedidoModel.obtenerTotalAcumulado();

    const filas = pedido.map(n => `
        <tr>
            <td>${n.nombre}</td>
            <td>${n.tamañopizza}</td>
            <td>${n.ingredientes.join(', ') || 'Sin ingredientes'}</td>
            <td>${n.cantidadpizzas}</td>
            <td>$${n.precioUnitario}</td>
            <td>$${n.precioTotal}</td>
        </tr>
        `).join('');

    res.send(`
            <h1>Pedidos realizados</h1>
            ${pedido.length === 0
            ? '<p>No hay pedidos</p>'
            : `
            <table border="1" style="border-collapse: collapse; text-align: left; width: 80%;">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tamaño pizza</th>
                        <th>Ingredientes</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total Pedido</th>
                    </tr>
                </thead>
                <tbody>
                    ${filas}
                </tbody>
            </table>
            
            <h3 style="margin-top: 20px;">Total Acumulado de Ventas: $${totalAcumulado}</h3>
                `
        }
            <br>
            <a href="/">Volver al formulario</a>
            `)
}

module.exports = { registrarPedido, listarPedido }
