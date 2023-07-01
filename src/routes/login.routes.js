//importamos
const app = require('../../app');
const { Router } = require('express');

//Importamos el crud desde user.controller
const {
    readLogin,
    readallLogin,
    createLogin,
    updateLogin,
    deleteLogin,
    validarLogin,
}= require('../controller/login.controller');


const router = Router();


//endpoint rutas
//recibe una peticion y el servidor siempre da una respuesta 
router.get('/:id', readLogin);
router.get('/', readallLogin);
router.post('/', createLogin);
router.put('/:id', updateLogin);
router.delete('/:id', deleteLogin);
router.post('/validar', validarLogin);


//Exportamos las endpoints
module.exports = router;
