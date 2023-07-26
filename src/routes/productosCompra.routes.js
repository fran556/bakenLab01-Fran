//importamos
const app = require('../../app');
const { Router } = require('express');

//Importamos el crud desde user.controller

const {
    readProductosCompraId,
    readProductosCompra,
    createProductosCompra,
    updateProductosCompra,
    deleteProductosCompra  
}= require('../controller/productosCompra.controller');

const router = Router();


//endpoint rutas
//recibe una peticion y el servidor siempre da una respuesta 

router.get('/', readProductosCompra);
router.get('/:id', readProductosCompraId);
router.post('/', createProductosCompra);
router.put('/:id', updateProductosCompra);
router.delete('/:id', deleteProductosCompra);



//Exportamos las endpoints
module.exports = router;
