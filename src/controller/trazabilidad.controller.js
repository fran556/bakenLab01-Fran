const database = require('../config/database');
const mysql2 = require('mysql2')
// crud
/* 
Aqui se usa para leer los datos 
*/

const readTrazabilidad = (req, res) => {

  const readQuery = `
    SELECT trazabilidad.*, empleados.Nombre
    FROM trazabilidad
    INNER JOIN empleados ON trazabilidad.idEmpleado = empleados.idEmpleado order by trazabilidad.idTrazabilidad desc;
  `;
    // const {idMuestreo, idPila, TipoPez, Fecha, Cantidad,idEmpleado, Origen} = req.body; // para extraer el parametro de la ruta de la solicitud
    // const readQuery = `SELECT * FROM trazabilidad;`;
    // const  query = mysql2.format(readQuery, [idMuestreo, idPila, TipoPez, Fecha, Cantidad,idEmpleado, Origen]);

    database.query(readQuery,(err,result)=>{
        if (err) throw err;
        if (result.length !== 0){
            res.json(result);
        }else{
            res.json({message: 'Registro no encontrado'})
        }
        
    });
};
//aqui es para obtener por id
const readTrazabilidadId = (req, res) => {
    const { id } = req.params;
    // const { Fecha,Encargado,EspeciePescado,Cantidad,PilaIngreso,Proveedor,LoteProveedor,PilaProveedor } = req.body; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `SELECT * FROM trazabilidad where idtrazabilidad = ?;`;
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
//obtener la trazabilidad de la ultima pila 
const readTrazabilidadIdpila = (req, res) => {
    const { id } = req.params;
    // const { Fecha,Encargado,EspeciePescado,Cantidad,PilaIngreso,Proveedor,LoteProveedor,PilaProveedor } = req.body; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `SELECT MAX(idTrazabilidad) as idTrazabilidad FROM trazabilidad WHERE idPila=?;`;
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
const createTrazabilidad = (req, res) => {

    const { idMuestreo, idPila, TipoPez, Fecha, Cantidad, idEmpleado } = req.body;
  
    if (!idMuestreo || !idPila || !TipoPez || !Fecha || !Cantidad || !idEmpleado) {
      res.status(400).send({ error: "Faltan campos requeridos" });
      return;
    }
  
    const callProcedure = `CALL IngresarTrazabilidad(?, ?, ?, ?, ?, ?)`;
    const values = [idMuestreo, idPila, TipoPez, Fecha, Cantidad, idEmpleado];
  
    database.query(callProcedure, values, (err, result) => {
      if (err) throw err;
      if (result.length !== 0){
        // console.error("Error al insertar los datos:", err);
        // res.status(500).send({ err: "No se puede completar el registro" });
        // Manejar el error apropiadamente
        res.json(result)

      } else {
       
        // res.send({ message: "Trazabilidad registrada" });
      
        res.send({ message: "Trazabilidad No registrada hacer Muestreo primero" });
      }

      // if (err) {
      //   console.error("Error al registrar Trazabilidad:", err);
      //   res.status(500).send({ error: "Error en el servidor" });
      // } else {
      //   console.log(result);
      //   if(res.affectedRows!==0){
          
      //     res.send({ message: "Trazabilidad registrada" });
      //   }else{
      //     res.send({ message: "Trazabilidad No registrada hacer Muestreo primero" });
      //   }
        
      // }
    });
  
  };
  
/*
Aqui se actualiza 
*/
const updateTrazabilidad = (req, res) => {
    const { id } = req.params;
  
    const selectQuery = `SELECT * FROM trazabilidad WHERE idTrazabilidad = ?;`;
    const query = mysql2.format(selectQuery, [id]);
  
    try {
      database.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Error al obtener los datos de la base de datos' });
          return;
        }
  
        if (result.length === 0) {
          res.status(404).json({ message: 'Trazavilidad no encontrado' });
          return;
        }
  
        const trazabilidadActual = result[0];
  
        const campos = ['idMuestreo','idPila', 'TipoPez', 'Fecha', 'Cantidad', 'idEmpleado', 'Origen'];
  
        const valoresModificados = campos.reduce((acc, campo) => {
          if (req.body[campo] && req.body[campo] !== trazabilidadActual[campo]) {
            acc[campo] = req.body[campo];
          }
          return acc;
        }, {});
  
        if (Object.keys(valoresModificados).length === 0) {
          res.status(400).json({ message: 'No se a realizado ningún cambio' });
          return;
        }
  
        const updateQuery = `UPDATE trazabilidad SET ? WHERE idTrazabilidad = ?;`;
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
const deleteTrazabilidad = (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
  
      const deleteQuery = `DELETE FROM trazabilidad WHERE idTrazabilidad = ?`;
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

  // traer peces actuales
  const readTotalPecesPila = (req, res) => {
    const { id } = req.params;
    const readQuery = `SELECT PilasExistente1(?) as Resultado ;`;
    const query = mysql2.format(readQuery, [id]);
  
    database.query(query, (err, result) => {
      if (err) throw err;
      if (result.length !== 0) {
        // Extraemos el objeto que contiene las propiedades Lote y CantidadPeces
        const data = result[0].Resultado;
  
        // Accedemos a las propiedades CantidadPeces y Lote del objeto data
        const cantidadPeces = data.CantidadPeces;
        const lote = data.Lote;
  
        // Imprimimos la información en la consola
        console.log(`Cantidad de peces: ${cantidadPeces}`);
        console.log(`Lote: ${lote}`);
  
        res.json(result);
      } else {
        res.json({ message: 'Registro no encontrado' });
      }
    });
  };
  
  
// Aqui se exporta el crud 
module.exports = {
    readTrazabilidad,
    readTrazabilidadId,
    createTrazabilidad,
    updateTrazabilidad,
    deleteTrazabilidad,  
    readTrazabilidadIdpila,
    readTotalPecesPila
};