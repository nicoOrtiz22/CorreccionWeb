
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

    // 1. Creamos el array de ingredientes PRIMERO para poder contar cuántos hay
    const ingredientes = [
        ingrediente_jamon, ingrediente_quesoext, ingrediente_champ,
        ingrediente_cebolla, ingrediente_aceituna, ingrediente_tocino,
        ingrediente_pimenton
    ].filter(ing => ing !== undefined);

    // 2. Definimos precios base y costo de ingredientes extra por tamaño
    let precioBase = 0;
    let valorIngredienteExtra = 0;

    if (tamañopizza === "Chica") {
        precioBase = 3990;
        valorIngredienteExtra = 500; // Valor extra por ingrediente en pizza chica
    } else if (tamañopizza === "Mediana") {
        precioBase = 5990;
        valorIngredienteExtra = 800;
    } else if (tamañopizza === "Grande") {
        precioBase = 8490;
        valorIngredienteExtra = 1200;
    }

    // 3. Calculamos ingredientes extra (asumiendo que los primeros 3 son gratis/base)
    const limiteIngredientesBase = 3;
    const extras = ingredientes.length > limiteIngredientesBase
        ? ingredientes.length - limiteIngredientesBase
        : 0;

    // 4. Aplicamos la fórmula: (Base + (Extras * Valor Extra)) * Cantidad
    const precioUnitario = precioBase + (extras * valorIngredienteExtra);
    const precioTotal = precioUnitario * parseInt(cantidadpizzas);

    // 5. Guardamos el pedido (Asegúrate que tu modelo acepte estos datos)
    // En pedidoController.js, cuando llamas al modelo:
    pedidoModel.registrarPedido({
        nombre: nombre,
        tamañopizza: tamañopizza,
        ingredientes: ingredientes,
        cantidadpizzas: cantidadpizzas,
        precioTotal: precioTotal // Este es el valor que calculamos en el paso anterior
    });

    console.log(`Pedido de ${nombre} registrado. Total: $${precioTotal}`);
    res.redirect('/pedidos');

}

function listarPedido(req, res) {
    const pedido = pedidoModel.obtenerPedido();

    const filas = pedido.map(n => `
        <tr>
            <td>${n.nombre}</td>
            <td>${n.tamañopizza}</td>
            <td>${n.ingredientes.join(', ') || 'Sin ingredientes'}</td>
            <td>${n.cantidadpizzas}</td>
        </tr>
        `).join('');

    res.send(`
            <h1>Pedidos realizados</h1>
            ${pedidos.length === 0
            ? '<p>No hay notas</p>'
            : `
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tamaño pizza</th>
                        <th>Ingredientes</th>
                        <th>Cantidad de pizzas</th>
                        
                    </tr>
                </thead>
                <tbody>
                    ${filas}
                </tbody>
            </table>
                `
        }
            `)
}

module.exports = { registrarPedido, listarPedido }

//precio base del tamaño + (ingredientes extra × valor extra del tamaño)