const jwt = require('jsonwebtoken')
require('../../env/config')
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error: 'Acceso denegado' });
  
    const token = authHeader.split(' ')[1]; // Se asume que el token está en el formato 'Bearer <token>'
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;

        // Verificar la expiración del token
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (verified.exp < currentTimestamp) {
      return res.status(401).json({ error: 'Token expirado' });
    }

     // Agregar la información del usuario a la respuesta
     const userData = {
        tipoEmpleado: verified.idEmpleado,
        Cedula: verified.Cedula,
        Nombre: verified.Nombre
      };
      console.log(userData);
      res.userData = userData; // Agregar los datos del usuario a la respuesta
      next();
    } catch (error) {
      res.status(400).json({ error: 'Token no válido, acceso denegado' });
    }
  };
  
  module.exports = verifyToken;
  