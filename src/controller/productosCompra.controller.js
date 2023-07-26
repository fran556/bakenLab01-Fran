const database = require('../config/database');
const mysql2 = require('mysql2')
// crud
/* 
Aqui se usa para leer los datos 
*/
const readProductosCompra = (req, res) => {
   const readQuery = `SELECT productoscompra.*, proveedores.idproveedores, proveedores.NombreProveedor, empleados.Nombre, empleados.Apellido FROM productoscompra
   INNER JOIN proveedores ON productoscompra.Proveedor = proveedores.idproveedores
   INNER JOIN empleados ON empleados.idEmpleado = productoscompra.Empleado;`;

    database.query(readQuery,(err,result)=>{
        if (err) throw err;
        if (result.length !== 0){
            res.json(result);
        }else{
            res.json({message: 'Registro no encontrado'})
        }
        
    });
};
const readProductosCompraId = (req, res) => {
    const { id } = req.params;
    // const { Fecha,Encargado,EspeciePescado,Cantidad,PilaIngreso,Proveedor,LoteProveedor,PilaProveedor } = req.body; // para extraer el parametro de la ruta de la solicitud
    const readQuery = `SELECT * FROM productoscompra where idCompra= ?;`;
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
const createProductosCompra = (req, res) => {
    const {FechaCompra,Empleado, Marca, Proveedor, TipoProducto,Cantidad, ValorMedidas, CantidadProteina, MedidaProteina, Precio, FechaVencimiento } = req.body;
  
     // Define valores por defecto para los campos que puedan faltar
    
    const CantidadProteinaDefault = CantidadProteina || 0;
    const MedidaProteinaDefault = MedidaProteina || '-----';
    
    if (!FechaCompra || !Empleado || !Marca || !Proveedor || !TipoProducto || !Cantidad || !ValorMedidas || !Precio || !FechaVencimiento ) {
      res.status(400).send({ error: "Faltan campos requeridos" });
      return;
    }
  
    const createQuery = `INSERT INTO productoscompra (FechaCompra, Empleado, Marca, Proveedor, TipoProducto,Cantidad, ValorMedidas, CantidadProteina, MedidaProteina, Precio, FechaVencimiento ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const query = mysql2.format(createQuery, [FechaCompra, Empleado, Marca, Proveedor, TipoProducto,Cantidad, ValorMedidas, CantidadProteinaDefault, MedidaProteinaDefault, Precio, FechaVencimiento]);
  
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
const updateProductosCompra = (req, res) => {
    const { id } = req.params;
    // const { NombreProveedor, Direccion, Provincia, Canton, Distrito, NombreContacto, Telefono, Email } = req.body;
  
    const selectQuery = `SELECT * FROM productoscompra WHERE idCompra = ?;`;
    const query = mysql2.format(selectQuery, [id]);
  
    try {
      database.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Error al obtener los datos de la base de datos' });
          return;
        }
  
        if (result.length === 0) {
          res.status(404).json({ message: 'Compra no encontrado' });
          return;
        }
  
        const CompraActual = result[0];
  
        const campos = ['FechaCompra', 'Empleado','Marca', 'Proveedor','TipoProducto', 'Cantidad','ValorMedidas', 'CantidadProteina', 'MedidaProteina', 'Precio', 'FechaVencimiento'];
  
        const valoresModificados = campos.reduce((acc, campo) => {
          if (req.body[campo] && req.body[campo] !== CompraActual[campo]) {
            acc[campo] = req.body[campo];
          }
          return acc;
        }, {});
  
        if (Object.keys(valoresModificados).length === 0) {
          res.status(400).json({ message: 'No se a realizado ningún cambio' });
          return;
        }
  
        const updateQuery = `UPDATE productoscompra SET ? WHERE idCompra = ?;`;
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
const deleteProductosCompra = (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
  
      const deleteQuery = `DELETE FROM productoscompra WHERE idCompra = ?`;
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
    readProductosCompraId,
    readProductosCompra,
    createProductosCompra,
    updateProductosCompra,
    deleteProductosCompra, 
}; 