const database = require('../config/database');
const mysql2 = require('mysql2')
// crud
/* 
Aqui se usa para leer los datos 
*/
const readConcentrado = (req, res) => {
    const {FechaCompra, Marca, Proveedor, CantidadProteina, Precio, FechaVencimiento } = req.body; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `SELECT * FROM concentrado;`;
    const  query = mysql2.format(readQuery, [FechaCompra, Marca, Proveedor, CantidadProteina, Precio, FechaVencimiento]);

    database.query(query,(err,result)=>{
        if (err) throw err;
        if (result.length !== 0){
            res.json(result);
        }else{
            res.json({message: 'Registro no encontrado'})
        }
        
    });
};
const readConcentradoId = (req, res) => {
    const { id } = req.params;
    // const { Fecha,Encargado,EspeciePescado,Cantidad,PilaIngreso,Proveedor,LoteProveedor,PilaProveedor } = req.body; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `SELECT * FROM concentrado where idConcentrado= ?;`;
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
const createConcentrado = (req, res) => {
    const {FechaCompra, Marca, Proveedor, CantidadProteina, Precio, FechaVencimiento } = req.body;
  
    if (!FechaCompra || !Marca || !Proveedor || !CantidadProteina || !Precio || !FechaVencimiento ) {
      res.status(400).send({ error: "Faltan campos requeridos" });
      return;
    }
  
    const createQuery = `INSERT INTO concentrado (FechaCompra, Marca, Proveedor, CantidadProteina, Precio, FechaVencimiento ) VALUES (?, ?, ?, ?, ?, ?)`;
    const query = mysql2.format(createQuery, [FechaCompra, Marca, Proveedor, CantidadProteina, Precio, FechaVencimiento]);
  
    database.query(query, (err, result) => {
      if (err) {
        console.error("Error al registrar Concentrado:", err);
        res.status(500).send({ error: "Error al registrar " });
      } else {
        console.log(result);
        res.send({ message: "Concentrado registrado" });
      }
    });
  };
  
/*
Aqui se actualiza 
*/
const updateConcentrado = (req, res) => {
    const { id } = req.params;
    // const { NombreProveedor, Direccion, Provincia, Canton, Distrito, NombreContacto, Telefono, Email } = req.body;
  
    const selectQuery = `SELECT * FROM concentrado WHERE idConcentrado = ?;`;
    const query = mysql2.format(selectQuery, [id]);
  
    try {
      database.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Error al obtener los datos de la base de datos' });
          return;
        }
  
        if (result.length === 0) {
          res.status(404).json({ message: 'Concentrado no encontrado' });
          return;
        }
  
        const ConcentradoActual = result[0];
  
        const campos = ['FechaCompra','Marca', 'Proveedor', 'CantidadProteina', 'Precio', 'FechaVencimiento'];
  
        const valoresModificados = campos.reduce((acc, campo) => {
          if (req.body[campo] && req.body[campo] !== ConcentradoActual[campo]) {
            acc[campo] = req.body[campo];
          }
          return acc;
        }, {});
  
        if (Object.keys(valoresModificados).length === 0) {
          res.status(400).json({ message: 'No se a realizado ningún cambio' });
          return;
        }
  
        const updateQuery = `UPDATE concentrado SET ? WHERE idConcentrado = ?;`;
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
const deleteConcentrado = (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
  
      const deleteQuery = `DELETE FROM concentrado WHERE idConcentrado = ?`;
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
    readConcentradoId,
    readConcentrado,
    createConcentrado,
    updateConcentrado,
    deleteConcentrado, 
}; 