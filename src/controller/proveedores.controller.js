const database = require('../config/database');
const mysql2 = require('mysql2')
// crud
/* 
Aqui se usa para leer los datos 
*/
const readProveedor = (req, res) => {
    const {TipoProveedor, NombreProveedor,Direccion,Provincia,Canton,Distrito,NombreContacto, TipoCedula, Cedula, Telefono,Email } = req.body; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `SELECT * FROM proveedores;`;
    const  query = mysql2.format(readQuery, [TipoProveedor,NombreProveedor,Direccion,Provincia,Canton,Distrito,NombreContacto,TipoCedula,Cedula,Telefono,Email]);

    database.query(query,(err,result)=>{
        if (err) throw err;
        if (result.length !== 0){
            res.json(result);
        }else{
            res.json({message: 'Registro no encontrado'})
        }
        
    });
};
const readProveedorId = (req, res) => {
    const { id } = req.params;
    // const { Fecha,Encargado,EspeciePescado,Cantidad,PilaIngreso,Proveedor,LoteProveedor,PilaProveedor } = req.body; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `SELECT * FROM proveedores where idproveedores = ?;`;
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
const createProveedor = (req, res) => {
    const {TipoProveedor, NombreProveedor,Direccion,Provincia,Canton,Distrito,NombreContacto, TipoCedula, Cedula, Telefono,Email } = req.body;
  
    if (!TipoProveedor || !NombreProveedor || !Direccion || !Provincia || !Canton || !Distrito || !NombreContacto || !TipoCedula || !Cedula || !Telefono || !Email) {
      res.status(400).send({ error: "Faltan campos requeridos" });
      return;
    }
  
    const createQuery = `INSERT INTO  proveedores (TipoProveedor, NombreProveedor,Direccion,Provincia,Canton,Distrito,NombreContacto, TipoCedula, Cedula, Telefono,Email ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const query = mysql2.format(createQuery, [TipoProveedor, NombreProveedor,Direccion,Provincia,Canton,Distrito,NombreContacto, TipoCedula, Cedula, Telefono,Email  ]);
  
    database.query(query, (err, result) => {
      if (err) {
        console.error("Error al registrar Proveedor:", err);
        res.status(500).send({ error: "Error en el servidor" });
      } else {
        console.log(result);
        res.send({ message: "Proveedor registrado" });
      }
    });
  };
  
/*
Aqui se actualiza 
*/
const updateProveedor = (req, res) => {
    const { id } = req.params;
    // const { NombreProveedor, Direccion, Provincia, Canton, Distrito, NombreContacto, Telefono, Email } = req.body;
  
    const selectQuery = `SELECT * FROM proveedores WHERE idproveedores = ?;`;
    const query = mysql2.format(selectQuery, [id]);
  
    try {
      database.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Error al obtener los datos de la base de datos' });
          return;
        }
  
        if (result.length === 0) {
          res.status(404).json({ message: 'Proveedor no encontrado' });
          return;
        }
  
        const proveedorActual = result[0];
  
        const campos = ['TipoProveedor','NombreProveedor', 'Direccion', 'Provincia', 'Canton', 'Distrito', 'NombreContacto', 'TipoCedula','Cedula, Telefono', 'Email'];
  
        const valoresModificados = campos.reduce((acc, campo) => {
          if (req.body[campo] && req.body[campo] !== proveedorActual[campo]) {
            acc[campo] = req.body[campo];
          }
          return acc;
        }, {});
  
        if (Object.keys(valoresModificados).length === 0) {
          res.status(400).json({ message: 'No se a realizado ningún cambio' });
          return;
        }
  
        const updateQuery = `UPDATE proveedores SET ? WHERE idproveedores = ?;`;
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
const deleteProveedor = (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
  
      const deleteQuery = `DELETE FROM proveedores WHERE idproveedores = ?`;
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
    readProveedorId,
    readProveedor,
    createProveedor,
    updateProveedor,
    deleteProveedor,  
}; 