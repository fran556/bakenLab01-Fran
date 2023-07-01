//importamos
const app = require('../../app');
const { Router } = require('express');

//Importamos el crud desde user.controller

const {
    readProveedorId,
    readProveedor,
    createProveedor,
    updateProveedor,
    deleteProveedor,    
}= require('../controller/proveedores.controller');

const router = Router();


//endpoint rutas
//recibe una peticion y el servidor siempre da una respuesta 

router.get('/', readProveedor);
router.get('/:id',readProveedorId );
router.post('/', createProveedor);
router.put('/:id', updateProveedor);
router.delete('/:id', deleteProveedor);



//Exportamos las endpoints
module.exports = router;