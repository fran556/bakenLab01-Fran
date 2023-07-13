const database = require('../config/database');
const mysql2 = require('mysql2')
// crud
/* 
Aqui se usa para leer los datos 
*/
const readAlimento = (req, res) => {
    // const {Fecha, Empleado, Pila, TipoAlimento, CantidadAlimento, Observacion } = req.body; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `SELECT alimentacion.*,empleados.idEmpleado, empleados.Nombre, empleados.Apellido
    FROM alimentacion
    INNER JOIN empleados ON alimentacion.Empleado = empleados.idEmpleado;`;
    // const  query = mysql2.format(readQuery, [Fecha, Empleado, Pila, TipoAlimento, CantidadAlimento, Observacion]);

    
  database.query(readQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error al obtener los registros de la base de datos' });
      return;
    }

    if (result.length !== 0) {
      res.json(result);
    } else {
      res.json({ message: 'Registro no encontrado' });
    }
  });

    // database.query(query,(err,result)=>{
    //     if (err) throw err;
    //     if (result.length !== 0){
    //         res.json(result);
    //     }else{
    //         res.json({message: 'Registro no encontrado'})
    //     }
        
    // });
};

const readAlimentoId = (req, res) => {
    const { id } = req.params;
    // const { Fecha,Encargado,EspeciePescado,Cantidad,PilaIngreso,Proveedor,LoteProveedor,PilaProveedor } = req.body; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `SELECT * FROM alimentacion where idAlimentacion = ?;`;
    const  query = mysql2.format(readQuery, [id]);

    database.query(query,(err,result)=>{
        if (err) throw err;
        if (result.length !== 0){
            res.json(result);
            console.log(result);
        }else{
            res.json({message: 'Registro no encontrado'})
        }
    });
};
/*
Aui para crear o insertar un usuario a la base de datos 
*/
const createAlimento = (req, res) => {
    const {Fecha, Empleado, Pila, TipoAlimento, CantidadAlimento, Observacion } = req.body;
  
    if (!Fecha || !Empleado || !Pila || !TipoAlimento || !CantidadAlimento || !Observacion ) {
      res.status(400).send({ error: "Faltan campos requeridos" });
      return;
    }
  
    const createQuery = `INSERT INTO  alimentacion (Fecha, Empleado, Pila, TipoAlimento, CantidadAlimento, Observacion ) VALUES (?, ?, ?, ?, ?, ?)`;
    const query = mysql2.format(createQuery, [Fecha, Empleado, Pila, TipoAlimento, CantidadAlimento, Observacion]);
  
    database.query(query, (err, result) => {
      if (err) {
        console.error("Error al registrar Alimentacion:", err);
        res.status(500).send({ error: "Error en el servidor" });
      } else {
        console.log(result);
        res.send({ message: "Alimentacion registrado" });
      }
    });
  };
  
/*
Aqui se actualiza 
*/
const updateAlimento = (req, res) => {
    const { id } = req.params;
    // const { NombreProveedor, Direccion, Provincia, Canton, Distrito, NombreContacto, Telefono, Email } = req.body;
  
    const selectQuery = `SELECT * FROM alimentacion WHERE idAlimentacion = ?;`;
    const query = mysql2.format(selectQuery, [id]);
  
    try {
      database.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Error al obtener los datos de la base de datos' });
          return;
        }
  
        if (result.length === 0) {
          res.status(404).json({ message: 'Alimentacion no encontrado' });
          return;
        }
  
        const AlimentacionActual = result[0];
  
        const campos = ['Fecha','Empleado', 'Pila', 'TipoAlimento', 'CantidadAlimento', 'Observacion'];
  
        const valoresModificados = campos.reduce((acc, campo) => {
          if (req.body[campo] && req.body[campo] !== AlimentacionActual[campo]) {
            acc[campo] = req.body[campo];
          }
          return acc;
        }, {});
  
        if (Object.keys(valoresModificados).length === 0) {
          res.status(400).json({ message: 'No se a realizado ningún cambio' });
          return;
        }
  
        const updateQuery = `UPDATE alimentacion SET ? WHERE idAlimentacion = ?;`;
        const updateValues = [valoresModificados, id];
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
const deleteAlimento = (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
  
      const deleteQuery = `DELETE FROM alimentacion WHERE idAlimentacion = ?`;
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
    readAlimentoId,
    readAlimento,
    createAlimento,
    updateAlimento,
    deleteAlimento, 
}; 