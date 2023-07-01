const database = require('../config/database');
const mysql2 = require('mysql2')
// crud
/* 
Aqui se usa para leer los datos 
*/
const readIngresoAlevine = (req, res) => {
  const readQuery = `
    SELECT ingresoalevines.*, proveedores.NombreProveedor
    FROM ingresoalevines
    INNER JOIN proveedores ON ingresoalevines.idProveedor = proveedores.idproveedores;
  `;

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
};

const readIngresoAlevineId = (req, res) => {
    const { id } = req.params;
    // const { Fecha,Encargado,EspeciePescado,Cantidad,PilaIngreso,Proveedor,LoteProveedor,PilaProveedor } = req.body; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `SELECT * FROM ingresoalevines where id=?;`;
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
/*
Aui para crear o insertar un usuario a la base de datos 
*/
const createIngresoAlevine = (req, res) => {
    const { Fecha, Encargado, EspeciePescado, Cantidad, PilaIngreso, idProveedor, LoteProveedor, PilaProveedor } = req.body;
  
    if (!Fecha || !Encargado || !EspeciePescado || !Cantidad || !PilaIngreso || !idProveedor || !LoteProveedor || !PilaProveedor) {
      res.status(400).send({ error: "Faltan campos requeridos" });
      return;
    }
  
    const createQuery = `INSERT INTO ingresoalevines (Fecha, Encargado, EspeciePescado, Cantidad, PilaIngreso, idProveedor, LoteProveedor, PilaProveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const query = mysql2.format(createQuery, [Fecha, Encargado, EspeciePescado, Cantidad, PilaIngreso, idProveedor, LoteProveedor, PilaProveedor]);
  
    database.query(query, (err, result) => {
      if (err) {
        console.error("Error al registrar el ingreso de alevines:", err);
        res.status(500).send({ error: "No se puede completar el registro" });
      } else {
        console.log(result);
        res.send({ message: "Ingreso de Alevines registrado" });
      }
    });
  };
  
/*
Aqui se actualiza 
*/
const updateIngresoAlevine = (req, res) => {
  const { id } = req.params;

  const selectQuery = `SELECT * FROM ingresoalevines WHERE id = ?;`;
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
        res.status(404).json({ message: 'Alevin no encontrado' });
        return;
      }

      const alevinActual = result[0];

      const campos = ['Fecha', 'Encargado', 'EspeciePescado', 'Cantidad', 'PilaIngreso', 'idProveedor', 'LoteProveedor', 'PilaProveedor'];

      let datosModificados = false; // Inicializar como false

      const valoresModificados = campos.reduce((acc, campo) => {
        if (req.body[campo] && req.body[campo] !== alevinActual[campo]) {
          acc[campo] = req.body[campo];
        }
        return acc;
      }, {});

      if (Object.keys(valoresModificados).length === 0) {
        res.status(400).json({ message: 'No es necesario realizar la actualización' });
        return;
      }
      const updateQuery = `UPDATE ingresoalevines SET ? WHERE id= ?;`;
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
const deleteIngresoAlevine = (req, res) => {
    try {
      const { id } = req.params;
  
      const deleteQuery = `DELETE FROM ingresoalevines WHERE id=?`;
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
    readIngresoAlevineId,
    readIngresoAlevine,
    createIngresoAlevine,
    updateIngresoAlevine,
    deleteIngresoAlevine,
};