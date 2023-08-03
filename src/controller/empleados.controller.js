const database = require('../config/database');
const mysql2 = require('mysql2')
// crud
/* 
Aqui se usa para leer los datos 
*/

//AQUIE LEEMOS TODOS LOS EMPLEADOS LISTO PARA ENVIARLOS!
const readEmpleados = (req, res) => {
    //const { id } = req.params; // para extraer el parametro de la ruta de la solicitud
    res.json({"OK":"200","msj":"Mesaje GET devuelto desde el controlador empleados Este es un saludo Desde el backend Francisco "});
  };

 const readEmpleadosId = (req, res) => {
     const { id } = req.params;
    //  const {idRol, Cedula, Nombre, Apellido, telefono} = req.body; // para extraer el parametro de la ruta de la solicitud
     const readQuery = `SELECT * FROM empleados where idEmpleado=?;`;
     const  query = mysql2.format(readQuery, [id]);

     database.query(query,(err,result)=>{
         if (err) throw err;
         if (result.length !== undefined){
             res.json(result);
             console.log(result);
         }else{
             res.json({message: 'Registro no encontrado'})
         }
     });
 };


const createEmpleados = (req, res) => {
  const { idRol, Cedula, Nombre, Apellido, Telefono } = req.body;
  
  if (!idRol || !Cedula || !Nombre || !Apellido || !Telefono) {
    res.send({ error: "Faltan campos requeridos" });
    return;
  }


  console.log(idRol)
  console.log(idRol)
  console.log(idRol)
  console.log(idRol)


  const createQuery = `INSERT INTO empleados (idRol, Cedula, Nombre, Apellido, Telefono) VALUES (?, ?, ?, ?, ?)`;
  const query = mysql2.format(createQuery, [idRol, Cedula, Nombre, Apellido, Telefono]);

  database.query(query, (err, result) => {
    if (err) {
      console.error("Error al registrar el ingreso de alevines:", err);
      res.send({ error: "No se puede completar el registro" });
    } else {
      console.log(result);
      res.send({ message: "Ingreso de Usuario registrado" });
    }
  });
};
  
/*
Aqui se actualiza 
*/
const updateEmpleados = (req, res) => {
  const { id } = req.params;

  const selectQuery = `SELECT * FROM empleados WHERE idEmpleado = ?;`;
  const query = mysql2.format(selectQuery, [id]);

  try {
    database.query(query, (err, result) => {
      // console.log(result);
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Error al obtener los datos de la base de datos' });
        return;
      }

      if (result.length === 0) {
        res.status(404).json({ message: 'Empleado no encontrado' });
        return;
      }

      const empleadoActual = result[0];

      const campos = ['idRol' ,'Cedula', 'Nombre', 'Apellido', 'Telefono'];

      let datosModificados = false; // Inicializar como false

      const valoresModificados = campos.reduce((acc, campo) => {
        if (req.body[campo] && req.body[campo] !== empleadoActual[campo]) {
          acc[campo] = req.body[campo];
        }
        return acc;
      }, {});

      if (Object.keys(valoresModificados).length === 0) {
        res.status(400).json({ message: 'No es necesario realizar la actualización' });
        return;
      }
      const updateQuery = `UPDATE empleados SET ? WHERE idEmpleado= ?;`;
      const updateValues = [valoresModificados, id]; // Copia de los valores de req.body
      const updateQueryFormatted = mysql2.format(updateQuery, updateValues);

      database.query(updateQueryFormatted, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Error al actualizar el registro' });
          return;
        }

        console.log(result);
        res.json({ message: 'Registro actualizado' });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


/*
aqui se elimina
*/
const deleteEmpleados = (req, res) => {
    try {
      const { id } = req.params;
  
      const deleteQuery = `DELETE FROM empleados WHERE idEmpleado=?`;
      const query = mysql2.format(deleteQuery, [id]);
  
      database.query(query, (err, result) => {
        if (err) {
          console.error("Error al eliminar el registro:", err);
          res.status(500).send({ error: "Error en el servidor" });
        } else {
          console.log(result);
          res.send({ message: "Registro eliminado" });
        }
      });
    } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).send({ error: "Error en el servidor" });
    }
    
  };
// Aqui se exporta el crud 
module.exports = {
    readEmpleadosId,
    readEmpleados,
    createEmpleados,
    updateEmpleados,
    deleteEmpleados,
};