const database = require('../config/database');
const mysql2 = require('mysql2');


const readPilas = (req, res) => {
    const { Pila } = req.body;
    //const { id } = req.params; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `SELECT * FROM pilas;`;
    const  query = mysql2.format(readQuery, [Pila]);

    database.query(query,(err,result)=>{
        if (err) throw err;
        if (result[0] !== undefined){
            res.json(result);
        }else{
            res.json({message: 'Usuario no encontrado'})
        }
    });
};
const readActivePilas = (req, res) => {
    const { Pila } = req.body;
    //const { id } = req.params; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `select * from pilas where Activo=b'1'`;
    const  query = mysql2.format(readQuery, [Pila]);

    database.query(query,(err,result)=>{
        if (err) throw err;
        if (result[0] !== undefined){
            res.json(result);
        }else{
            res.json({message: 'Usuario no encontrado'})
        }
    });
};
const readDisablePilas = (req, res) => {
    const { Pila } = req.body;
    //const { id } = req.params; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `select * from pilas where Activo=b'0'`;
    const  query = mysql2.format(readQuery, [Pila]);

    database.query(query,(err,result)=>{
        if (err) throw err;
        if (result[0] !== undefined){
            res.json(result);
        }else{
            res.json({message: 'Usuario no encontrado'})
        }
    });
};

const createPila = (req, res) => {
  const { Pila,Descripcion,Activo} = req.body;
  console.log(Pila);

  const selectQuery = `SELECT * FROM pilas WHERE Pila = ?`;
  const selectQueryParams = [Pila];

  database.query(selectQuery, selectQueryParams, (selectErr, selectResult) => {
    if (selectErr) {
      console.error(`Error al verificar la existencia de la pila ${Pila}:`, selectErr);
      res.send({ error: `No se puede completar la verificación de la pila` });
    } else {
      if (selectResult.length > 0) {
        res.send({ message: `La pila ${Pila} ya existe en la base de datos` });
      } else {
        const createQuery = `INSERT INTO pilas (Pila,Descripcion) VALUES (?,?)`;
        const createQueryParams = [Pila, Descripcion,Activo];
        const query = mysql2.format(createQuery, createQueryParams);

        database.query(query, (createErr, createResult) => {
          if (createErr) {
            console.error(`Error al registrar la pila ${Pila}:`, createErr);
            res.send({ error: `No se puede completar el registro de la pila` });
          } else {
            console.log(createResult);
            res.send({ message: `Pila ${Pila} registrado` });
          }
        });
      }
    }
  });
};





  module.exports = {
    // readPilaId,
    readPilas,
    readActivePilas,
    readDisablePilas,
    createPila,
    // updatePila,
    // deletePila,  
};