//importamos
const app = require('../../app');
const { Router } = require('express');

//Importamos el crud desde user.controller

const {
    readAlimentoId,
    readAlimento,
    createAlimento,
    updateAlimento,
    deleteAlimento,    
}= require('../controller/alimentacion.controller');

const router = Router();


//endpoint rutas
//recibe una peticion y el servidor siempre da una respuesta 

router.get('/', readAlimento);
router.get('/:id', readAlimentoId);
router.post('/', createAlimento);
router.put('/:id', updateAlimento);
router.delete('/:id', deleteAlimento);



//Exportamos las endpoints
module.exports = router;
