//ola pato, si ves esto, intenta adaptar el registrarnota del controlador 


//>eu niko solo en caso de fijate en Routes linea 5 creo q no esta tomando bien hecha/conectada la ruta

const pedidoModel = require('../models/pedidoModel');

function registrarPedido(req, res) {
    // 1. Extraemos los nombres exactos que definiste en el atributo 'name' del HTML
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
    var precioPizzaChica = 0;
    var precioPizzaMediana = 0;
    var precioPizzaGrande = 0;


    if (tamañopizza == pizzaChica && ingredientes.length <= 3) {
        precioPizzaChica = 3990;
    }
    else if (tamañopizza == pizzaMediana && ingredientes.length <= 3) {
        precioPizzaChica = 5990;
    }
    else if (tamañopizza == pizzaGrande && ingredientes.length <= 3) {
        precioPizzaChica = 8490;
    }



    const ingredientes = [
        ingrediente_jamon, ingrediente_quesoext, ingrediente_champ,
        ingrediente_cebolla, ingrediente_aceituna, ingrediente_tocino,
        ingrediente_pimenton
    ].filter(ing => ing !== undefined);



    console.log(`Pedido de ${nombre}: ${cantidadpizzas} pizza(s) ${tamañopizza}.`);
    console.log(`Ingredientes: ${ingredientes.join(', ')}`);



    res.send("Pedido recibido con éxito");
}

function listarPedido(req, res) {
    const pedido = pedidoModel.obtenerPedido();

    const filas = pedido.map(n => `
        <tr>
            <td>${n.nombre}</td>
            <td>${n.tamañopizza}</td>
            <td>${n.ingredientes.join(', ')}</td>
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

//precio base del tamaño + (ingredientes extra × valor extra del tamaño)