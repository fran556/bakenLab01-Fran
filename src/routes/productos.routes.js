//importamos
const app = require('../../app');
const { Router } = require('express');

//Importamos el crud desde user.controller

const { 
    readProductos,
    readProductosId,
    createProductos,
    updateProductos,
    deleteProductos,
}= require('../controller/productos.controller');

const router = Router();


//endpoint rutas
//recibe una peticion y el servidor siempre da una respuesta 
router.get('/', readProductos);
router.get('/:id', readProductosId);
router.post('/', createProductos);
router.put('/:id', updateProductos);
router.delete('/:id', deleteProductos);



//Exportamos las endpoints
module.exports = router;


