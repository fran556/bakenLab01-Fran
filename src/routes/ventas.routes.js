//importamos
const app = require('../../app');
const { Router } = require('express');

//Importamos el crud desde user.controller

const {
    readVentasId,
    readVentas,
    createVenta,
    updateVenta,
    deleteVenta,    
}= require('../controller/ventas.controller');

const router = Router();


//endpoint rutas
//recibe una peticion y el servidor siempre da una respuesta 

router.get('/', readVentas);
router.get('/:id', readVentasId);
router.post('/', createVenta);
router.put('/:id', updateVenta);
router.delete('/:id', deleteVenta);



//Exportamos las endpoints
module.exports = router;
