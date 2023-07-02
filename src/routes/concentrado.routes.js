//importamos
const app = require('../../app');
const { Router } = require('express');

//Importamos el crud desde user.controller

const {
    readConcentradoId,
    readConcentrado,
    createConcentrado,
    updateConcentrado,
    deleteConcentrado,    
}= require('../controller/concentrado.controller');

const router = Router();


//endpoint rutas
//recibe una peticion y el servidor siempre da una respuesta 

router.get('/', readConcentrado);
router.get('/:id', readConcentradoId);
router.post('/', createConcentrado);
router.put('/:id', updateConcentrado);
router.delete('/:id', deleteConcentrado);



//Exportamos las endpoints
module.exports = router;
