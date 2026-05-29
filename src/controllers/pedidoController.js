
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

    let pedidoMasCaro = null;
    if (pedido.length > 0) {
        pedidoMasCaro = pedido.reduce((prev, current) => (prev.precioTotal > current.precioTotal) ? prev : current);
    }

    const filas = pedido.map(n => `
        <tr>
            <td>${n.nombre}</td>
            <td>${n.tamañopizza}</td>
            <td>${n.ingredientes.join(', ') || 'Sin ingredientes'}</td>
            <td>${n.cantidadpizzas}</td>
            <td>$${n.precioUnitario.toLocaleString()}</td>
            <td>$${n.precioTotal.toLocaleString()}</td>
        </tr>
        `).join('');

    const seccionPedidoMasCaro = pedidoMasCaro ? `
        <div class="card mb-4 border-warning shadow-sm">
            <div class="card-header bg-warning text-dark">
                <h5 class="mb-0">⭐ Pedido más caro realizado</h5>
            </div>
            <div class="card-body">
                <p class="card-text">
                    <strong>Cliente:</strong> ${pedidoMasCaro.nombre} | 
                    <strong>Tamaño:</strong> ${pedidoMasCaro.tamañopizza} | 
                    <strong>Total:</strong> <span class="badge bg-danger fs-6">$${pedidoMasCaro.precioTotal.toLocaleString()}</span>
                </p>
            </div>
        </div>
    ` : '';

    res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedidos Realizados</title>
    <!-- Bootstrap 5 CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- Navbar responsivo -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="/">Pizzería</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Hacer Pedido</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/pedidos/ver">Ver Pedidos</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <h1 class="mb-4">Pedidos Realizados</h1>
        
        ${pedido.length === 0
            ? '<div class="alert alert-info">No hay pedidos registrados aún.</div>'
            : `
            ${seccionPedidoMasCaro}

            <div class="table-responsive shadow-sm rounded">
                <table class="table table-striped table-hover align-middle mb-0">
                    <thead class="table-dark">
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
            </div>
            
            <div class="card mt-4 border-primary">
                <div class="card-body">
                    <h3 class="card-title text-primary">Total Acumulado de Ventas: $${totalAcumulado.toLocaleString()}</h3>
                </div>
            </div>
            `
        }
        
        <div class="mt-4 mb-5">
            <a href="/" class="btn btn-secondary">Volver al formulario</a>
        </div>
    </div>

    <!-- Bootstrap 5 JS Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `)
}

module.exports = { registrarPedido, listarPedido }
