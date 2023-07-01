//importamos
const app = require('../../app');
const { Router } = require('express');

//Importamos el crud desde user.controller
const {
    ReadSampling,
    ReadAllSampling,
    CreateSampling,
    UpdateSampling,
    DeleteSampling
}= require('../controller/muestreo.controller');


const router = Router();


//endpoint rutas
//recibe una peticion y el servidor siempre da una respuesta 
router.get('/:id', ReadSampling);
router.get('/', ReadAllSampling);
router.post('/', CreateSampling);
router.put('/:id', UpdateSampling);
router.delete('/:id', DeleteSampling);


//Exportamos las endpoints
module.exports = router;