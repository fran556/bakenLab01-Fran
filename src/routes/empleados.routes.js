//importamos
const app = require('../../app');
const { Router } = require('express');

//Importamos el crud desde user.controller

const { 
    readEmpleados,
    readEmpleadosId,
   
    createEmpleados,
    updateEmpleados,
    deleteEmpleados,
}= require('../controller/empleados.controller');

const router = Router();


//endpoint rutas
//recibe una peticion y el servidor siempre da una respuesta 
router.get('/', readEmpleados);
router.get('/', readEmpleadosId);
router.post('/', createEmpleados);
router.put('/:id', updateEmpleados);
router.delete('/:id', deleteEmpleados);



//Exportamos las endpoints
module.exports = router;


