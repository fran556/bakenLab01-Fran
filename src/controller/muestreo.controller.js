const database = require('../config/database');
const mysql2 = require('mysql2')
// crud
/* 
Aqui se usa para leer los datos por id
*/
const ReadSampling = (req, res) => {
  const { id } = req.params; // para extraer el parametro de la ruta de la solicitud
  const readQuery = `SELECT * FROM aprotila.muestreo WHERE idMuestreo=?;`;
  const query = mysql2.format(readQuery, [id]);

  database.query(query, (err, result) => {
    if (err) throw err;
    if (result[0] !== undefined) {
      res.json(result[0]);
    } else {
      res.json({ message: 'Usuario no encontrado' })
    }
  });
};


const ReadAllSampling = (req, res) => {
  const { idMuestreo, Cantidad, PesoPromedio, Fecha, Aprobacion, idEmpleado, Observacion, idPila } = req.body;
  //const { id } = req.params; // para extraer el parametro de la ruta de la solicitud
  const readQuery = `SELECT muestreo.*, trazabilidad.idPila
    FROM muestreo
    INNER JOIN trazabilidad ON muestreo.idTrazabilidad = trazabilidad.idTrazabilidad;
    `;
  const query = mysql2.format(readQuery, [idMuestreo, Cantidad, PesoPromedio, Fecha, Aprobacion, idEmpleado, Observacion, idPila]);

  database.query(query, (err, result) => {
    if (err) throw err;
    if (result[0] !== undefined) {
      res.json(result);
    } else {
      res.json({ message: 'Usuario no encontrado' })
    }
  });
};
/*
Aui para crear o insertar un usuario a la base de datos 
*/
const CreateSampling = (req, res) => {

  const { Cantidad, PesoPromedio, Fecha, Aprobacion, idEmpleado, Observacion, PilaL } = req.body; /destructuring, req.body se utiliza para acceder a los datos enviados en el cuerpo de la solicitud./

  console.log(PilaL)

  const UltimaTrazabilidad = `SELECT MAX(idTrazabilidad) As idTrazabilidad FROM aprotila.trazabilidad where idPila = ?`
  const queryy = mysql2.format(UltimaTrazabilidad, [PilaL]);

  console.log(queryy);
  database.query(queryy, (error, results) => {
    if (error) {
      console.error("Error al obtener el último idTrazabilidad:", error);
      // Manejar el error apropiadamente
    } else {
      const idTrazabilidad = results[0].idTrazabilidad;
      if (idTrazabilidad === null) {
        console.log(idTrazabilidad)
        res.send({ message: 'Esa trazabilidad no existe' });
      } else {
        console.log(idTrazabilidad)
        const createQuery = `INSERT INTO aprotila.muestreo (idTrazabilidad, Cantidad, PesoPromedio, Fecha, Aprobacion, idEmpleado, Observacion) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [idTrazabilidad, Cantidad, PesoPromedio, Fecha, Aprobacion, idEmpleado, Observacion];
        database.query(createQuery, values, (error, result) => {
          if (error) {
            console.error("Error al insertar los datos:", error);
            // Manejar el error apropiadamente
          } else {
            // Los datos se insertaron correctamente
            res.send({ message: 'Usuario Registrado' });
          }
        });
      }

    }
  });





  //  const { Cantidad,PesoPromedio,Fecha,Aprobacion,idEmpleado,Observacion} = req.body;/destructuring, req.body se utiliza para acceder a los datos enviados en el cuerpo de la solicitud./



  // const UltimaTrazabilidad = `select  max(idTrazabilidad) as idTrazabilidad from aprotila.trazabilidad where idPila = ?;`;
  // const mt=[PilaL];
  // // const UltimaTrazabilidad = mysql2.format(UltimaTrazabilidadXD)
  // database.query(UltimaTrazabilidad,mt, (error, results) => {
  //     if (error) {
  //       console.error("Error al obtener el último idTrazabilidad:", error);
  //       // Manejar el error apropiadamente
  //     } else {
  //       const idTrazabilidad = results[0].idTrazabilidad;

  //       const createQuery = `INSERT INTO aprotila.muestreo (idTrazabilidad, Cantidad, PesoPromedio, Fecha, Aprobacion, idEmpleado, Observacion) VALUES (?, ?, ?, ?, ?, ?, ?);`;
  //       const values = [idTrazabilidad, Cantidad, PesoPromedio, Fecha, Aprobacion, idEmpleado, Observacion];

  //       database.query(createQuery, values, (error, res) => {
  //         if (error) {
  //           console.error("Error al insertar los datos:", error);
  //           // Manejar el error apropiadamente
  //         } else {
  //           // Los datos se insertaron correctamente
  //           res.send({ message: 'Muestreo Registrado' });
  //         }
  //       });
  //     }
  //   });
};

/*
Aqui se actualiza 
*/
const UpdateSampling = (req, res) => {
  const { id } = req.params; // para extraer el parametro de la ruta de la solicitud 
  const { Cantidad, PesoPromedio, Fecha, Aprobacion, idEmpleado, Observacion } = req.body;

  if (!Cantidad || !PesoPromedio || !Fecha || !Aprobacion || !idEmpleado || !Observacion) {
    res.status(400).json({ message: 'No se pueden actualizar los campos vacíos' });
    return;
  }

  const updateQuery = `UPDATE aprotila.muestreo SET Cantidad = ?, PesoPromedio = ?, Fecha = ?, Aprobacion = ?, idEmpleado = ?, Observacion = ? WHERE idMuestreo=?;`;
  const query = mysql2.format(updateQuery, [Cantidad, PesoPromedio, Fecha, Aprobacion, idEmpleado, Observacion, id]);

  database.query(query, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Se actualizo correctamente el muestreo' })

  });

};
/*
aqui se elimina
*/
const DeleteSampling = (req, res) => {
  const { id } = req.params; // para extraer el parametro de la ruta de la solicitud

  const deleteQuery = `DELETE FROM aprotila.muestreo WHERE idMuestreo=?`;
  const query = mysql2.format(deleteQuery, [id]);

  database.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    if (result.affectedRows > 0) {
      res.send({ message: 'Registro Eliminado' });
    } else {
      res.send({ message: 'El registro no existe en la base de datos' });
    }
  })
};

// Aqui se exporta el crud 
module.exports = {
  ReadSampling,
  ReadAllSampling,
  CreateSampling,
  UpdateSampling,
  DeleteSampling
};