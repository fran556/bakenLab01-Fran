//importamos
const app = require('../../app');
const { Router } = require('express');

//Importamos el crud desde user.controller

const {    
    createUsers
}= require('../controller/registro.controller');

const router = Router();


//endpoint rutas
//recibe una peticion y el servidor siempre da una respuesta 
router.post('/', createUsers);

//Exportamos las endpoints
module.exports = router;


