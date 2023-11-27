const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    // Lógica para invalidar el token o eliminar cualquier información de sesión
    // Puedes agregar el token a una lista negra, por ejemplo
    const token = req.headers.authorization.split(' ')[1]; // Extraer el token de la cabecera

    // Lógica para agregar el token a una lista negra o eliminar cualquier información de sesión
    // Ejemplo: blacklist.add(token);

    res.status(200).json({ success: true, message: 'Logout successful' });
});

module.exports = router;
