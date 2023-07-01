//importamos
const app = require('../../app');
const { Router } = require('express');

//Importamos el crud desde user.controller

const {
    readMortalidadId,
    readMortalidad,
    createMortalidad,
    updateMortalidad,
    deleteMortalidad,    
}= require('../controller/mortalidad.controller');

const router = Router();


//endpoint rutas
//recibe una peticion y el servidor siempre da una respuesta 

router.get('/:id',readMortalidadId );
router.get('/', readMortalidad);
router.post('/', createMortalidad);
router.put('/:id', updateMortalidad);
router.delete('/:id', deleteMortalidad);



//Exportamos las endpoints
module.exports = router;