//importamos
const app = require('../../app');
const { Router } = require('express');

//Importamos el crud desde user.controller

const {
    readIngresoAlevineId,
    readIngresoAlevine,
    createIngresoAlevine,
    updateIngresoAlevine,
    deleteIngresoAlevine,    
}= require('../controller/ingresoAlevines.controller');

const router = Router();


//endpoint rutas
//recibe una peticion y el servidor siempre da una respuesta 

router.get('/', readIngresoAlevine);
router.get('/:id', readIngresoAlevineId);
router.post('/', createIngresoAlevine);
router.put('/:id', updateIngresoAlevine);
router.delete('/:id', deleteIngresoAlevine);



//Exportamos las endpoints
module.exports = router;
