//importamos
const app = require('../../app');
const { Router } = require('express');

//Importamos el crud desde user.controller

const {
    // readPilaId,
    readPilas,
    readActivePilas,
    readDisablePilas,
    createPila,
    // updatePila,
    // deletePila,    
}= require('../controller/pilas.controller');

const router = Router();


//endpoint rutas
//recibe una peticion y el servidor siempre da una respuesta 

router.get('/', readPilas);
router.get('/activas', readActivePilas);
router.get('/inactivas', readDisablePilas);

// router.get('/:id', readPilaId);
router.post('/', createPila);
// router.put('/:id', updatePila);
// router.delete('/:id', deletePila);



//Exportamos las endpoints
module.exports = router;
