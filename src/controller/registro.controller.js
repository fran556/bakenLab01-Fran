const database = require('../config/database');
const mysql2 = require('mysql2')


const createUsers = (req, res) => {
    const { idRol, Cedula, Contrasena} = req.body;
    
    if (!idRol || !Cedula || !Contrasena) {
      res.send({ error: "Faltan campos requeridos" });
      return;
    }
  
  
    console.log(idRol)
  
    const createQuery = `INSERT INTO login (idRol, Cedula, Contrasena) VALUES (?, ?, ?)`;
    const query = mysql2.format(createQuery, [idRol, Cedula, Contrasena]);
  
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

module.exports = {
    createUsers
};