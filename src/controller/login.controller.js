const database = require('../config/database');
const mysql2 = require('mysql2')
// crud
/* 
Aqui se usa para leer los datos por id
*/
const readLogin = (req, res) => {
    const { id } = req.params; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `SELECT * FROM User WHERE id=?;`;
    const  query = mysql2.format(readQuery, [id]);

    database.query(query,(err,result)=>{
        if (err) throw err;
        if (result[0] !== undefined){
            res.json(result[0]);
        }else{
            res.json({message: 'Usuario no encontrado'})
        }
    });
};
const readallLogin = (req, res) => {
    const { Cedula, contrasena } = req.body;
    //const { id } = req.params; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `SELECT * FROM login;`;
    const  query = mysql2.format(readQuery, [Cedula, contrasena]);

    database.query(query,(err,result)=>{
        if (err) throw err;
        if (result[0] !== undefined){
            res.json(result);
        }else{
            res.json({message: 'Usuario no encontrado'})
        }
    });
};
/*
Aui para crear o insertar un usuario a la base de datos 
*/
const createLogin = (req, res) => { 
    const { Cedula, contrasena} = req.body;//destructuring, req.body se utiliza para acceder a los datos enviados en el cuerpo de la solicitud./

    const createQuery = `INSERT INTO login(Cedula, contrasena) VAlUEs(?, ?)`;
    const  query = mysql2.format(createQuery, [Cedula, contrasena]);

    database.query(query, (err, result) =>{
        if (err) throw err;
        // console.log(result);

        res.send({message: 'Usuario Registrado'});
    });
};

/*
Aqui se actualiza 
*/
const updateLogin = (req, res) => { 
    const { id } = req.params; // para extraer el parametro de la ruta de la solicitud 
    const { Nombre, Apellido } = req.body;

    if (!Nombre || !Apellido) {
    res.status(400).json({ message: 'No se pueden actualizar los campos vacíos' });
    return;
  }

    const updateQuery = `UPDATE User SET Nombre=?, Apellido=? WHERE id=?;`;
    const  query = mysql2.format(updateQuery, [Nombre, Apellido, id]);

    database.query(query,(err,result)=>{
        if (err) throw err;
        res.json({message: 'Usuario Actualizado'})
       
    });
};
/*
aqui se elimina
*/
const deleteLogin = (req, res) => { 
    const {id}=req.params; // para extraer el parametro de la ruta de la solicitud

    const deleteQuery = `DELETE FROM User WHERE id=?`;
    const query = mysql2.format(deleteQuery,[id]);

    database.query(query,(err,result) =>{
        if (err) throw err;
        console.log(result);
         if (result.affectedRows > 0) {
      res.send({ message: 'Usuario Eliminado' });
    } else {
      res.send({ message: 'El usuario no existe en la base de datos' });
    }
    })
};

//validar login
const validarLogin = (req, res) => {
  const { Cedula, contrasena } = req.body;

  // Verificar si se proporcionaron la cédula y la contraseña
  if (!Cedula || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realizar la validación en la base de datos
  const selectQuery = 'SELECT * FROM login WHERE Cedula = ? AND contrasena = ?';
  const query = mysql2.format(selectQuery, [Cedula, contrasena]);

  database.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Usuario autenticado correctamente
    res.status(200).json({ message: 'Autenticación exitosa' });
  });
};

  

// Aqui se exporta el crud 
module.exports = {
    readLogin,
    readallLogin,
    createLogin,
    updateLogin,
    deleteLogin,
    validarLogin,
};